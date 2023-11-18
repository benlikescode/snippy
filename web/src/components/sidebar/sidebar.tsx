import SidebarContent from '@/components/sidebar/sidebar-content'
import { getWorkspaces } from '@/server/actions/workspace.actions'
import { getServerAuthSession } from '@/server/auth'

const Sidebar = async () => {
  const session = await getServerAuthSession()

  if (!session || !session.user) {
    return null
  }

  const workspaces = await getWorkspaces(session.user.id)

  return <SidebarContent user={session.user} workspaces={workspaces} />
}

export default Sidebar
