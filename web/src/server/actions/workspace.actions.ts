'use server'

import { getServerAuthSession } from '@/server/auth'
import { db } from '@/server/db'
import { revalidatePath } from 'next/cache'

export const createWorkspace = async (name: string) => {
  const session = await getServerAuthSession()

  if (!session?.user.id) {
    throw new Error('Unauthorized')
  }

  const alreadyExists = await db.workspace.findFirst({
    where: {
      name,
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
  })

  if (alreadyExists) {
    throw new Error('A workspace already exists with that name')
  }

  await db.workspace.create({
    data: {
      name,
      members: {
        create: {
          isActive: true,
          role: 'OWNER',
          userId: session.user.id,
        },
      },
    },
  })

  return {
    message: 'The workspace was successfully created',
  }
}

export const changeWorkspace = async (workspaceId: string) => {
  const session = await getServerAuthSession()

  if (!session?.user.id) {
    throw new Error('Unauthorized')
  }

  await db.$transaction([
    db.workspaceMember.updateMany({
      where: {
        userId: session.user.id,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    }),

    db.workspaceMember.updateMany({
      where: {
        userId: session.user.id,
        workspaceId,
      },
      data: {
        isActive: true,
      },
    }),
  ])

  revalidatePath('/')
}
