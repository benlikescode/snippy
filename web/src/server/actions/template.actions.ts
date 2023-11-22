'use server'

import { getServerAuthSession } from '@/server/auth'
import { db } from '@/server/db'
import type { FileItemType, PromptType } from '@/types'

export const createTemplate = async (
  name: string,
  prompts: PromptType[],
  files: FileItemType[],
  workspaceId: string,
) => {
  const session = await getServerAuthSession()

  if (!session?.user.id) {
    return {
      error: {
        message: 'Unauthorized',
      },
    }
  }

  const alreadyExists = await db.template.findFirst({
    where: {
      name,
    },
  })

  if (alreadyExists) {
    return {
      error: {
        message: 'A template already exists with that name',
      },
    }
  }

  const createdTemplate = await db.template.create({
    data: {
      name,
      prompts,
      files,
      workspaceId,
      creatorId: session.user.id,
    },
  })

  return {
    message: 'The template was successfully created',
    id: createdTemplate.id,
  }
}

export const updateTemplate = async (
  id: string,
  name: string,
  prompts: PromptType[],
  files: FileItemType[],
) => {
  const session = await getServerAuthSession()

  if (!session?.user.id) {
    return {
      error: {
        message: 'Unauthorized',
      },
    }
  }

  await db.template.update({
    where: {
      id,
    },
    data: {
      name,
      prompts,
      files,
    },
  })

  return {
    message: 'The template was successfully updated',
  }
}

export const getTemplates = async (workspaceId: string) => {
  const session = await getServerAuthSession()

  if (!session?.user.id) {
    return {
      error: {
        message: 'Unauthorized',
      },
    }
  }

  return await db.template.findMany({
    where: {
      workspaceId,
      workspace: {
        user: {
          some: {
            id: session.user.id,
          },
        },
      },
    },
  })
}

export const deleteTemplate = async (id: string) => {
  const session = await getServerAuthSession()

  if (!session?.user.id) {
    return {
      error: {
        message: 'Unauthorized',
      },
    }
  }

  const hasPermission = await db.template.findFirst({
    where: {
      id,
      workspace: {
        user: {
          some: {
            id: session.user.id,
          },
        },
      },
    },
  })

  if (!hasPermission) {
    return {
      error: {
        message: 'Only members of the workspace can delete templates',
      },
    }
  }

  await db.template.delete({
    where: {
      id,
    },
  })
}
