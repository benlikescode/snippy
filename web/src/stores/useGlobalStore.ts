import { type WorkspaceWithInfo } from '@/server/actions/workspace.actions'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type State = {
  sidebarCollapsed: boolean
  activeWorkspace: WorkspaceWithInfo | null
  setSidebarCollapsed: (sidebarCollapsed: boolean) => void
  setActiveWorkspace: (workspace: WorkspaceWithInfo) => void
}

const useGlobalStore = create<State>()(
  devtools((set) => ({
    sidebarCollapsed: false,
    activeWorkspace: null,
    setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
    setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
  })),
)

export default useGlobalStore
