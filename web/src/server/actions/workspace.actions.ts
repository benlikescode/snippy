'use server'

import { getServerAuthSession } from '@/server/auth'
import { db } from '@/server/db'

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
