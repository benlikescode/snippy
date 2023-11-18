'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useState, type UIEvent } from 'react'
import NameInput from './name-input'
import PromptItem from './prompt-item'
import NewPrompt from './new-prompt'
import FileSystem from './file-system/file-system'
import useFileStore from '@/stores/useFileStore'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'
import useSnippyStore from '@/stores/useSnippyStore'
import CodeEditor from '@/app/snippy/_components/code-editor'
import { createTemplate } from '@/server/actions/template.actions'
import { toast } from '@/components/ui/use-toast'

const Snippy = () => {
  const [editorValue, setEditorValue] = useState('')
  const [showHeaderBorder, setShowHeaderBorder] = useState(false)
  const { files, openFile, pathToOpenFile, updateItemData } = useFileStore()
  const { prompts } = useSnippyStore()

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const scrolled = e.currentTarget.scrollTop > 0
    setShowHeaderBorder(scrolled)
  }

  useEffect(() => {
    if (!openFile || openFile.type === 'folder') {
      return setEditorValue('')
    }

    setEditorValue(openFile.data.content)
  }, [openFile])

  const handleSaveChanges = async () => {
    console.log('goated')
    const res = await createTemplate(
      'Cool one',
      JSON.stringify(prompts),
      JSON.stringify(files),
      'clp3fq9er000kt3goh5f88rda',
    )

    if (res.error) {
      toast({ description: res.error.message })
    }
  }

  const handleEditorChange = (value: string | undefined) => {
    if (!value || !openFile?.id) return

    setEditorValue(value)
    updateItemData(openFile.id, { content: value })
  }

  return (
    <div className="flex h-full w-full">
      <div className="flex w-[450px] shrink-0 flex-col justify-between border-r">
        <div className="max-h-[350px] overflow-y-auto" onScroll={handleScroll}>
          <div
            className={cn(
              'sticky top-0 flex h-[76px] items-center border-b border-transparent bg-background px-[30px]',
              showHeaderBorder && 'border-border',
            )}
          >
            <NameInput />
          </div>

          <div className="px-[30px] pb-[30px]">
            <div className="mb-4 space-y-3">
              {prompts.map((prompt) => (
                <PromptItem key={prompt.variable} prompt={prompt} />
              ))}
            </div>

            <NewPrompt />
          </div>
        </div>

        <FileSystem />

        <div className="flex h-[76px] items-center justify-between border-t p-4">
          <Button size="lg" variant="secondary">
            Cancel
          </Button>
          <Button size="lg" onClick={() => handleSaveChanges()}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className="h-full w-full">
        <div className="grid h-full bg-[#070707]">
          <div className="flex h-[50px] items-center border-b px-3 text-sm font-medium text-[#A3A3A3]">
            {pathToOpenFile.map((str, idx) => (
              <div key={idx} className="flex items-center">
                {idx !== 0 && <ChevronRightIcon className="h-4" />}
                {str}
              </div>
            ))}

            {!pathToOpenFile.length && (
              <span className=" text-[#717171]">Open a file to view it here</span>
            )}
          </div>
          <div>
            <CodeEditor value={editorValue} onChange={(value) => handleEditorChange(value)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Snippy
