'use client'

import SidebarItem from '@/components/sidebar/sidebar-item'
import { Button } from '../ui/button'
import { CogIcon, CometIcon, CreateIcon, HomeIcon, ShapesIcon } from '@/components/icons'
import WorkspaceSwitcher from './workspace-switcher'
import { usePathname, useRouter } from 'next/navigation'
import AccountPopover from '@/components/sidebar/account-popover'
import { type FC } from 'react'
import { cn } from '@/utils/cn'
import { type User } from 'next-auth'
import useGlobalStore from '@/stores/useGlobalStore'
import WorkspaceSettings from '@/components/workspace-settings'
import { type WorkspaceWithInfo } from '@/components/sidebar/sidebar'

type Props = {
  user: User
  activeWorkspace: WorkspaceWithInfo
  workspaces: WorkspaceWithInfo[]
}

const SidebarContent: FC<Props> = ({ user, activeWorkspace, workspaces }) => {
  const pathname = usePathname()
  const router = useRouter()

  const { sidebarCollapsed } = useGlobalStore()

  if (pathname === '/login' || pathname.startsWith('/snippy')) {
    return null
  }

  return (
    <div
      className={cn(
        'grid h-screen w-[300px] flex-shrink-0 grid-rows-sidebar border-r',
        sidebarCollapsed && 'w-[74px]',
      )}
    >
      <WorkspaceSwitcher activeWorkspace={activeWorkspace} workspaces={workspaces} />

      <div className={cn('overflow-y-auto p-4', sidebarCollapsed && 'p-3')}>
        <Button
          onClick={() => router.push('/snippy/new')}
          className="flex h-12 w-full select-none justify-start rounded-lg bg-newSnippy px-3 text-newSnippy-foreground hover:bg-newSnippy/90"
        >
          <CreateIcon className={cn('mr-3 h-6', sidebarCollapsed && 'mr-0')} />
          {!sidebarCollapsed && 'New Snippy'}
        </Button>

        <div className="mt-2.5 grid gap-1">
          <SidebarItem href="/">
            <HomeIcon className={cn('mr-3 h-6', sidebarCollapsed && 'mr-0')} />
            {!sidebarCollapsed && 'Home'}
          </SidebarItem>

          <SidebarItem href="/community">
            <ShapesIcon className={cn('mr-3 h-6', sidebarCollapsed && 'mr-0')} />
            {!sidebarCollapsed && 'Community'}
          </SidebarItem>

          <SidebarItem href="/install">
            <CometIcon className={cn('mr-3 h-6', sidebarCollapsed && 'mr-0')} />
            {!sidebarCollapsed && 'Install Extension'}
          </SidebarItem>

          <SidebarItem href="/settings">
            <CogIcon className={cn('mr-3 h-6', sidebarCollapsed && 'mr-0')} />
            {!sidebarCollapsed && 'Manage Workspace'}
          </SidebarItem>

          <WorkspaceSettings />
        </div>
      </div>

      <AccountPopover user={user} />
    </div>
  )
}

export default SidebarContent
