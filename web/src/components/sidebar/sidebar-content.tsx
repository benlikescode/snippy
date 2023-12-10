'use client'

import SidebarItem from '@/components/sidebar/sidebar-item'
import { Button } from '../ui/button'
import { CogIcon, CometIcon, CreateIcon, HomeIcon, ShapesIcon } from '@/components/icons'
import WorkspaceSwitcher from './workspace-switcher'
import { usePathname, useRouter } from 'next/navigation'
import AccountPopover from '@/components/sidebar/account-popover'
import { type FC } from 'react'
import { type User } from 'next-auth'
import WorkspaceSettings from '@/components/workspace-settings'
import { type WorkspaceWithInfo } from '@/components/sidebar/sidebar'

type Props = {
  user: User
  activeWorkspace: WorkspaceWithInfo
  initialWorkspaces: WorkspaceWithInfo[]
}

const SidebarContent: FC<Props> = ({ user, activeWorkspace, initialWorkspaces }) => {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/login' || pathname.startsWith('/snippy')) {
    return null
  }

  return (
    <div className="grid h-screen w-[300px] flex-shrink-0 grid-rows-sidebar border-r">
      <WorkspaceSwitcher activeWorkspace={activeWorkspace} initialWorkspaces={initialWorkspaces} />

      <div className="overflow-y-auto p-4">
        <Button
          onClick={() => router.push('/snippy/new')}
          className="flex h-12 w-full select-none justify-start rounded-lg bg-newSnippy px-3 text-newSnippy-foreground hover:bg-newSnippy/90"
        >
          <CreateIcon className="mr-3 h-6" />
          New Snippy
        </Button>

        <div className="mt-2.5 grid gap-1">
          <SidebarItem href="/">
            <HomeIcon className="mr-3 h-6" />
            Home
          </SidebarItem>

          <SidebarItem href="/community">
            <ShapesIcon className="mr-3 h-6" />
            Community
          </SidebarItem>

          <SidebarItem href="/install">
            <CometIcon className="mr-3 h-6" />
            Install Extension
          </SidebarItem>

          <SidebarItem href="/settings">
            <CogIcon className="mr-3 h-6" />
            Manage Workspace
          </SidebarItem>

          <WorkspaceSettings />
        </div>
      </div>

      <AccountPopover user={user} />
    </div>
  )
}

export default SidebarContent
