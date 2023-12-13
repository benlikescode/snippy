import SidebarContent from '@/components/sidebar/sidebar-content'
import { getServerAuthSession } from '@/server/auth'
import { db } from '@/server/db'

const Sidebar = async () => {
  const session = await getServerAuthSession()

  if (!session || !session.user) {
    return null
  }

  const workspaces = await getWorkspaces(session.user.id)

  const activeWorkspace = workspaces.find((workspace) =>
    workspace.members.find((member) => member.user.id === session.user.id && member.isActive),
  )

  if (!activeWorkspace) {
    return null
  }

  return (
    <SidebarContent
      user={session.user}
      activeWorkspace={activeWorkspace}
      initialWorkspaces={workspaces}
    />
  )
}

export type WorkspaceWithInfo = Awaited<ReturnType<typeof getWorkspaces>>[number]

const getWorkspaces = async (userId: string) => {
  return db.workspace.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      _count: true,
      members: {
        select: {
          user: true,
          role: true,
          isActive: true,
        },
      },
    },
  })
}

export default Sidebar
