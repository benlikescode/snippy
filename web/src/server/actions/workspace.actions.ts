'use server'
import { getServerAuthSession } from '@/server/auth'
import { db } from '@/server/db'

export type WorkspaceWithInfo = Awaited<ReturnType<typeof getWorkspaces>>[number]

export const getWorkspaces = async (userId: string) => {
  return db.workspace.findMany({
    where: {
      user: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      _count: true,
    },
  })
}

export const createWorkspace = async (name: string) => {
  const session = await getServerAuthSession()

  if (!session?.user.id) {
    return {
      error: {
        message: 'Unauthorized',
      },
    }
  }

  const alreadyExists = await db.workspace.findFirst({
    where: {
      name,
    },
  })

  if (alreadyExists) {
    return {
      error: {
        message: 'A workspace already exists with that name',
      },
    }
  }

  await db.workspace.create({
    data: {
      user: {
        connect: {
          id: session.user.id,
        },
      },
      name,
    },
  })

  return {
    message: 'The workspace was successfully created',
  }
}
