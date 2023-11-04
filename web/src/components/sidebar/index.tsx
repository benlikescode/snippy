import SidebarItem from '@/components/sidebar/sidebar-item'

const Sidebar = () => {
  return (
    <div className="grid-rows-sidebar grid h-screen w-72 flex-shrink-0 border-r">
      <div>Yo</div>

      <div>
        <div className="mt-2.5 grid gap-1">
          <SidebarItem href="/">Home</SidebarItem>

          <SidebarItem href="/community">Community</SidebarItem>

          <SidebarItem href="/install">Install Extension</SidebarItem>

          <SidebarItem href="/settings">Settings & Help</SidebarItem>
        </div>
      </div>

      <div>Yoooo</div>
    </div>
  )
}

export default Sidebar
