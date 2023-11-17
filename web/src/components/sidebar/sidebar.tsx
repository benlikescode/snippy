'use client'

import SidebarItem from '@/components/sidebar/sidebar-item'
import { Button } from '../ui/button'
import { CogIcon, CometIcon, CreateIcon, HomeIcon, ShapesIcon } from '@/components/icons'
import WorkspaceSwitcher from '../workspace-switcher'
import { usePathname, useRouter } from 'next/navigation'
import AccountPopover from '@/components/account-popover'
import { useEffect } from 'react'
import { cn } from '@/utils/cn'
import useSnippyStore from '@/stores/useSnippyStore'

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const { sidebarCollapsed, setSidebarCollapsed } = useSnippyStore()

  useEffect(() => {
    const COLLAPSED_PATHS = ['/snippy/new']

    setSidebarCollapsed(COLLAPSED_PATHS.includes(pathname))
  }, [pathname])

  if (pathname === '/login') {
    return null
  }

  return (
    <div
      className={cn(
        'grid h-screen w-[300px] flex-shrink-0 grid-rows-sidebar border-r',
        sidebarCollapsed && 'w-[74px]',
      )}
    >
      <WorkspaceSwitcher />

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
            {!sidebarCollapsed && 'Settings & Help'}
          </SidebarItem>
        </div>
      </div>

      <AccountPopover />
    </div>
  )
}

export default Sidebar
