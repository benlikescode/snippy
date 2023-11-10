import SidebarItem from '@/components/sidebar/sidebar-item'
import { getServerAuthSession } from '@/server/auth'
import { Avatar, AvatarImage } from '../ui/avatar'

const Sidebar = async () => {
  const session = await getServerAuthSession()

  if (!session || !session.user) {
    return null
  }

  return (
    <div className="grid h-screen w-72 flex-shrink-0 grid-rows-sidebar border-r">
      <div>Yo</div>

      <div>
        <div className="mt-2.5 grid gap-1">
          <SidebarItem href="/">Home</SidebarItem>

          <SidebarItem href="/community">Community</SidebarItem>

          <SidebarItem href="/install">Install Extension</SidebarItem>

          <SidebarItem href="/settings">Settings & Help</SidebarItem>
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
