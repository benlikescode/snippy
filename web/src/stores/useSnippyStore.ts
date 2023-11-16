import type { PromptType } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type State = {
  prompts: PromptType[]
  addPrompt: (prompt: PromptType) => void
  removePrompt: (id: string) => void
  updatePrompt: (prompt: PromptType) => void
}

const useSnippyStore = create<State>()(
  devtools((set) => ({
    prompts: [{ id: '48327847284732', prompt: 'Enter name of file', variable: 'name' }],
    addPrompt: (prompt) => set(({ prompts }) => ({ prompts: [...prompts, prompt] })),
    removePrompt: (id) => set(({ prompts }) => ({ prompts: prompts.filter((x) => x.id !== id) })),
    updatePrompt: (prompt) =>
      set(({ prompts }) => ({
        prompts: prompts.map((x) => (x.id === prompt.id ? { ...x, ...prompt } : x)),
      })),
  })),
)

export default useSnippyStore
