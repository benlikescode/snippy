'use client'

import CodeEditor from '@/components/code-editor'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import NameInput from '../_components/name-input'

const NewSnippyPage = () => {
  const [editorValue, setEditorValue] = useState('')

  return (
    <div className="flex h-full w-full">
      <div className="w-[450px] shrink-0 border-r border-border">
        <div className="max-h-[450px]">
          <div className="flex items-center gap-3 p-[30px]">
            <NameInput />
          </div>
        </div>

        <div className="footer-buttons">
          <Button variant="secondary">Cancel</Button>
          <Button>Save Changes</Button>
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
