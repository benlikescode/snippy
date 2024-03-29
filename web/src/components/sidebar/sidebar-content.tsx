'use client'

import { type FC } from 'react'
import { type User } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import { CreateIcon, HomeIcon, ShapesIcon } from '@/components/icons'
import InstallExtension from '@/components/install-extension'
import AccountPopover from '@/components/sidebar/account-popover'
import { type WorkspaceWithInfo } from '@/components/sidebar/sidebar'
import SidebarItem from '@/components/sidebar/sidebar-item'
import WorkspaceSettings from '@/components/workspace-settings/workspace-settings'
import { MAX_SNIPPYS_PER_WORKSPACE } from '@/validations/template.validations'
import { Button } from '../ui/button'
import WorkspaceSwitcher from './workspace-switcher'

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
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b md:hidden">
        <WorkspaceSwitcher
          activeWorkspace={activeWorkspace}
          initialWorkspaces={initialWorkspaces}
        />
      </div>

      {/* Sidebar */}
      <div className="hidden h-screen w-[74px] flex-shrink-0 grid-rows-sidebar border-r md:grid lg:w-[300px]">
        <WorkspaceSwitcher
          activeWorkspace={activeWorkspace}
          initialWorkspaces={initialWorkspaces}
        />

        <div className="flex flex-col justify-between overflow-y-auto border-b border-t p-3 lg:p-4">
          <div className="space-y-2">
            <Button
              disabled={activeWorkspace._count.templates >= MAX_SNIPPYS_PER_WORKSPACE}
              onClick={() => router.push('/snippy/new')}
              className="flex h-12 w-full select-none justify-center rounded-lg bg-newSnippy px-3 text-newSnippy-foreground hover:bg-newSnippy/90 lg:justify-start"
            >
              <CreateIcon className="mr-0 h-6 lg:mr-3" />
              <span className="hidden lg:block">New Snippy</span>
            </Button>

            <nav className="mt-2.5 grid gap-1">
              <SidebarItem href="/">
                <HomeIcon className="mr-0 h-6 lg:mr-3" />
                <span className="hidden lg:block">Home</span>
              </SidebarItem>

              <SidebarItem href="/community">
                <ShapesIcon className="mr-0 h-6 lg:mr-3" />
                <span className="hidden lg:block">Community</span>
              </SidebarItem>

              <WorkspaceSettings workspace={activeWorkspace} />
            </nav>
          </div>

          {!user.installedExtension ? (
            <InstallExtension />
          ) : (
            <div className="hidden lg:block">
              <div className="h-[6px] w-full rounded-full bg-[#171717]">
                <div
                  className="h-full rounded-full bg-[#4765b9] transition-all"
                  style={{
                    width: `${
                      (activeWorkspace._count.templates / MAX_SNIPPYS_PER_WORKSPACE) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-[#737373]">
                {activeWorkspace._count.templates} of {MAX_SNIPPYS_PER_WORKSPACE} snippys used
              </p>
            </div>
          )}
        </div>

        <AccountPopover user={user} />
      </div>
    </>
  )
}

export default SidebarContent
