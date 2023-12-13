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

    db.workspace.create({
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
    }),
  ])

  revalidatePath('/')

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

export const deleteWorkspace = async (workspaceId: string) => {
  const session = await getServerAuthSession()

  if (!session?.user.id) {
    throw new Error('Unauthorized')
  }

  const workspace = await db.workspace.findFirst({
    where: {
      id: workspaceId,
    },
    include: {
      members: true,
    },
  })

  if (!workspace?.id) {
    throw new Error('Failed to find workspace')
  }

  if (
    !workspace.members.some(
      (member) => member.userId === session.user.id && member.role === 'OWNER',
    )
  ) {
    throw new Error('Unauthorized')
  }

  if (workspace.isDefault) {
    throw new Error('Can not delete your default workspace')
  }

  await db.$transaction(async (tx) => {
    const membersInDeltedWorkspace = await tx.workspace.delete({
      where: {
        id: workspace.id,
      },
      select: {
        members: true,
      },
    })

    const memberIds = membersInDeltedWorkspace.members.map((member) => member.userId)

    await tx.workspaceMember.updateMany({
      where: {
        workspace: {
          isDefault: true,
        },
        userId: {
          in: memberIds,
        },
      },
      data: {
        isActive: true,
      },
    })
  })
}

export const addMembersToWorkspace = async (workspaceId: string, emails: string[]) => {
  if (!workspaceId) {
    throw new Error('Missing workspace id')
  }

  if (!emails?.length) {
    throw new Error('No emails were selected to invite')
  }

  const session = await getServerAuthSession()

  if (!session?.user.id) {
    throw new Error('Unauthorized')
  }

  const isMember = await db.workspace.findFirst({
    where: {
      id: workspaceId,
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
  })

  if (!isMember) {
    throw new Error('Must be a member of the workspace to invite people')
  }

  const users = await db.user.findMany({
    where: {
      email: {
        in: emails,
      },
    },
  })

  await db.workspace.update({
    where: {
      id: workspaceId,
    },
    data: {
      members: {
        createMany: {
          data: users.map((user) => ({
            isActive: false,
            role: 'MEMBER',
            userId: user.id,
          })),
        },
      },
    },
  })
}

export const leaveWorkspace = async (workspaceId: string) => {
  if (!workspaceId) {
    throw new Error('Missing workspace id')
  }

  const session = await getServerAuthSession()

  if (!session?.user.id) {
    throw new Error('Unauthorized')
  }

  const isThisUserAMember = await db.workspace.findFirst({
    where: {
      id: workspaceId,
      members: {
        some: {
          userId: session.user.id,
          role: 'MEMBER',
        },
      },
    },
  })

  if (!isThisUserAMember) {
    throw new Error('You are not a member of this workspace')
  }

  await db.$transaction(async (tx) => {
    await db.workspaceMember.delete({
      where: {
        userId_workspaceId: {
          userId: session.user.id,
          workspaceId,
        },
      },
    })

    await tx.workspaceMember.updateMany({
      where: {
        workspace: {
          isDefault: true,
        },
        userId: session.user.id,
      },
      data: {
        isActive: true,
      },
    })
  })
}

export const removeMemberFromWorkspace = async (workspaceId: string, memberId: string) => {
  if (!workspaceId) {
    throw new Error('Missing workspace id')
  }

  if (!memberId) {
    throw new Error('Missing member id')
  }

  const session = await getServerAuthSession()

  if (!session?.user.id) {
    throw new Error('Unauthorized')
  }

  const isWorkspaceOwner = await db.workspace.findFirst({
    where: {
      id: workspaceId,
      members: {
        some: {
          userId: session.user.id,
          role: 'OWNER',
        },
      },
    },
  })

  if (!isWorkspaceOwner) {
    throw new Error('Must be the owner of the workspace to remove members')
  }

  if (memberId === session.user.id) {
    throw new Error('Can not leave, since you are the owner of this workspace')
  }

  await db.$transaction(async (tx) => {
    await db.workspaceMember.delete({
      where: {
        userId_workspaceId: {
          userId: memberId,
          workspaceId,
        },
      },
    })

    await tx.workspaceMember.updateMany({
      where: {
        workspace: {
          isDefault: true,
        },
        userId: memberId,
      },
      data: {
        isActive: true,
      },
    })
  })
}

export const updateWorkspace = async (workspaceId: string, newName: string) => {
  if (!newName) {
    throw new Error('Missing workspace name')
  }

  await db.workspace.update({
    where: {
      id: workspaceId,
    },
    data: {
      name: newName,
    },
  })
}
