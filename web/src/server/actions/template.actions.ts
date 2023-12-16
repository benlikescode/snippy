'use server'

import { getServerAuthSession } from '@/server/auth'
import { db } from '@/server/db'
import type { FileItemType, PromptType } from '@/types'
import { revalidatePath } from 'next/cache'

export const createTemplate = async (
  name: string,
  prompts: PromptType[],
  files: FileItemType[],
) => {
  const session = await getServerAuthSession()

  if (!session?.user.id) {
    throw new Error('Unauthorized')
  }

  const alreadyExists = await db.template.findFirst({
    where: {
      name,
    },
  })

  if (alreadyExists) {
    throw new Error('A template already exists with that name')
  }

  const activeWorkspace = await db.workspaceMember.findFirst({
    where: {
      userId: session.user.id,
      isActive: true,
    },
  })

  if (!activeWorkspace?.workspaceId) {
    throw new Error('Could not link new template to workspace')
  }

  const createdTemplate = await db.template.create({
    data: {
      name,
      prompts,
      files,
      workspaceId: activeWorkspace.workspaceId,
      creatorId: session.user.id,
      updatedById: session.user.id,
    },
  })

  revalidatePath('/')

  return {
    message: 'The template was successfully created',
    id: createdTemplate.id,
  }
}

export const updateTemplate = async (
  templateId: string,
  name: string,
  prompts: PromptType[],
  files: FileItemType[],
  updatedAtLocal: Date,
  forceSave = false,
) => {
  const session = await getServerAuthSession()

  if (!session?.user.id) {
    throw new Error('Unauthorized')
  }

  const template = await db.template.findFirst({
    where: {
      id: templateId,
    },
    include: {
      workspace: {
        include: {
          members: true,
        },
      },
      updatedBy: true,
    },
  })

  if (!template) {
    throw new Error('Failed to find the template you are trying to update')
  }

  if (!template.workspace.members.some((member) => member.userId === session.user.id)) {
    throw new Error('Only members of the workspace can update this template')
  }

  const updateMadeUpstream = template.updatedAt.getTime() > updatedAtLocal.getTime()
  const updateNotMadeByUser = template.updatedById !== session.user.id

  if (updateMadeUpstream && updateNotMadeByUser && !forceSave) {
    return {
      hasEditConflict: true,
      lastUpdatedBy: template.updatedBy,
    }
  }

  await db.template.update({
    where: {
      id: templateId,
    },
    data: {
      name,
      prompts,
      files,
      updatedById: session.user.id,
    },
  })

  return {
    message: 'The template was successfully updated',
  }
}

export const getTemplates = async (page = 1) => {
  const session = await getServerAuthSession()

  if (!session?.user.id) {
    throw new Error('Unauthorized')
  }

  const itemsPerPage = 18
  const offset = (page - 1) * itemsPerPage

  const templates = await db.template.findMany({
    where: {
      workspace: {
        members: {
          some: {
            isActive: true,
            userId: session.user.id,
          },
        },
      },
    },
    skip: offset,
    take: itemsPerPage + 1, // get one extra to check for more
    orderBy: { updatedAt: 'desc' },
  })

  const hasMore = templates.length > itemsPerPage

  return { templates: templates.slice(0, itemsPerPage), hasMore }
}

export const deleteTemplate = async (templateId: string) => {
  const session = await getServerAuthSession()

  if (!session?.user.id) {
    throw new Error('Unauthorized')
  }

  // Owners can delete all, members can only delete ones they create
  const hasPermission = await db.template.findFirst({
    where: {
      id: templateId,
      OR: [
        {
          creatorId: session.user.id,
        },
        {
          workspace: {
            members: {
              some: {
                userId: session.user.id,
                role: 'OWNER',
              },
            },
          },
        },
      ],
    },
  })

  if (!hasPermission) {
    throw new Error('You must be an owner to delete this template')
  }

  await db.template.delete({
    where: {
      id: templateId,
    },
  })

  revalidatePath('/')
}
