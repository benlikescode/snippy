import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type State = {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (sidebarCollapsed: boolean) => void
}

const useGlobalStore = create<State>()(
  devtools((set) => ({
    sidebarCollapsed: false,
    setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
  })),
)

export default useGlobalStore
