import { HomeIcon, ShapesIcon, CreateIcon } from '@/components/icons'
import SidebarItem from '@/components/sidebar/sidebar-item'
import { db } from '@/server/db'
import { getServerAuthSession } from '@/server/auth'
import WorkspaceSettings from '@/components/workspace-settings/workspace-settings'
import AccountPopover from '@/components/sidebar/account-popover'

const MobileNav = async () => {
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
    <nav className="sticky bottom-0 z-20 flex h-[72px] w-full shrink-0 items-center justify-around border-t bg-[#0e0e0ee3] filter md:hidden">
      <SidebarItem href="/">
        <HomeIcon className="mr-3 h-6" />
      </SidebarItem>

      <SidebarItem href="/community">
        <ShapesIcon className="mr-3 h-6" />
      </SidebarItem>

      <SidebarItem href="/snippy/new">
        <CreateIcon className="mr-3 h-6" />
      </SidebarItem>

      <WorkspaceSettings workspace={activeWorkspace} />
      <AccountPopover user={session.user} align="end" alignOffset={0} />
    </nav>
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

export default MobileNav
