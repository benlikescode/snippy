'use client'

import CodeEditor from '@/components/code-editor'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import NameInput from '../_components/name-input'
import PromptItem from '@/app/snippy/_components/prompt-item'
import { type PromptType } from '@/types'
import NewPrompt from '@/app/snippy/_components/new-prompt'

const PROMPTS = [{ prompt: 'Enter name of file', variable: 'name' }]

const NewSnippyPage = () => {
  const [editorValue, setEditorValue] = useState('')

  return (
    <div className="flex h-full w-full">
      <div className="flex w-[450px] shrink-0 flex-col justify-between border-r border-border">
        <div className="max-h-[450px]">
          <div className="p-[30px]">
            <NameInput />
          </div>

          <div className="px-[30px]">
            <div className="mb-4 space-y-3">
              <PromptItem prompt={PROMPTS[0] as PromptType} />
              <PromptItem prompt={PROMPTS[0] as PromptType} />
            </div>

            <NewPrompt />
          </div>
        </div>

        <div className="flex h-[76px] items-center justify-between border-t p-4">
          <Button size="lg" variant="secondary">
            Cancel
          </Button>
          <Button size="lg">Save Changes</Button>
        </div>
      </div>

      <div className="h-full w-full">
        <div className="grid h-full bg-[#070707]">
          <div className="flex h-[60px] items-center border-b border-border px-3 text-sm text-[#A3A3A3]">
            Cool
          </div>
          <CodeEditor value={editorValue} />
        </div>
      </div>
    </div>
  )
}

export default NewSnippyPage
