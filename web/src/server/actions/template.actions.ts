'use server'

import { getServerAuthSession } from '@/server/auth'
import { db } from '@/server/db'

export const createTemplate = async (
  name: string,
  prompts: string,
  files: string,
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

  await db.template.create({
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
  }
}
