'use client'

import SidebarItem from '@/components/sidebar/sidebar-item'
import { getServerAuthSession } from '@/server/auth'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { CogIcon, CometIcon, CreateIcon, HomeIcon, ShapesIcon } from '@/components/icons'
import WorkspaceSwitcher from '../workspace-switcher'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Sidebar = () => {
  // const session = await getServerAuthSession()
  const { data: session } = useSession()
  const router = useRouter()

  if (!session || !session.user) {
    return null
  }

  return (
    <div className="grid h-screen w-[300px] flex-shrink-0 grid-rows-sidebar border-r">
      <WorkspaceSwitcher />

      <div className="overflow-y-auto p-4">
        <Button
          onClick={() => router.push('/snippy/new')}
          className="bg-newSnippy text-newSnippy-foreground hover:bg-newSnippy/90 flex h-12 w-full select-none justify-start rounded-lg px-3"
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
            Settings & Help
          </SidebarItem>
        </div>
      </div>

      <div className="flex items-center border border-input p-4">
        <Avatar>
          <AvatarImage src={session.user.image || ''} />
        </Avatar>
        <span className="ml-3">{session.user.name}</span>
      </div>
    </div>
  )
}

export default Sidebar
