'use client'

import { Button } from '@/components/ui/button'
import { useEffect, type FC } from 'react'
import NameInput from './name-input'
import FileSystem from './file-system/file-system'
import useFileStore from '@/stores/useFileStore'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import useSnippyStore from '@/stores/useSnippyStore'
import CodeEditor from '@/app/snippy/_components/code-editor'
import { createTemplate, updateTemplate } from '@/server/actions/template.actions'
import { toast } from '@/components/ui/use-toast'
import { type Template } from '@prisma/client'
import { type FileItemType, type PromptType } from '@/types'
import useGlobalStore from '@/stores/useGlobalStore'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import Prompts from './prompts/prompts'
import TypeSelector from '@/app/snippy/_components/type-selector'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  snippy?: Template
}

const Snippy: FC<Props> = ({ snippy }) => {
  const { files, pathToOpenFile, setFiles, setOpenFile, setPathToOpenFile } = useFileStore()
  const { prompts, snippyName, setPrompts, setSnippyName } = useSnippyStore()
  const { activeWorkspace } = useGlobalStore()
  const router = useRouter()

  useEffect(() => {
    setDefaultState()

    return () => {
      setOpenFile(null)
      setPathToOpenFile([])
    }
  }, [snippy])

  const setDefaultState = () => {
    setSnippyName(snippy?.name ?? '')
    setPrompts((snippy?.prompts as PromptType[]) ?? [])
    setFiles(snippy?.files ? [...(snippy?.files as FileItemType[])] : [])
  }

  const handleSaveChanges = async () => {
    if (!snippy) return

    const res = await updateTemplate(snippy.id, snippyName, prompts, files)

    if (res.error) {
      return toast({ variant: 'destructive', description: res.error.message })
    }

    toast({ description: res.message })
  }

  const handleCreateSnippy = async () => {
    if (!activeWorkspace) return

    const res = await createTemplate(snippyName, prompts, files, activeWorkspace.id)

    if (res.error) {
      return toast({ variant: 'destructive', description: res.error.message })
    }

    toast({ description: res.message })
    router.replace(`/snippy/${res.id}`)
  }

  return (
    <div className="flex h-full w-full flex-col ">
      <div className="flex h-[76px] w-full shrink-0 items-center justify-between border-b px-5">
        <div className="flex items-center space-x-3">
          <Link href="/" className="h-8 w-8">
            <Button variant="ghost" className="h-full w-full">
              <ChevronLeftIcon className="h-7 w-7 shrink-0 text-[#484848]" />
            </Button>
          </Link>

          <NameInput />
        </div>

        <div className="flex items-center gap-3">
          <TypeSelector />

          <Button size="lg" onClick={() => (snippy ? handleSaveChanges() : handleCreateSnippy())}>
            {snippy ? 'Save Changes' : 'Create Snippy'}
          </Button>
        </div>
      </div>

      <div className="flex h-full">
        <div className="flex w-[460px] shrink-0 flex-col border-r bg-[#070707]">
          <Prompts />
          <FileSystem />
        </div>

        {!!pathToOpenFile.length ? (
          <div className="h-full w-full">
            <div className="grid h-full">
              <div className="flex h-12 items-center bg-[#0c0c0c] px-4 text-sm font-medium text-[#bababa]">
                {pathToOpenFile.map((str, idx) => (
                  <div key={idx} className="flex items-center">
                    {idx !== 0 && <ChevronRightIcon className="h-4 stroke-[2px] text-[#767676]" />}
                    {str}
                  </div>
                ))}
              </div>

              <CodeEditor />
            </div>
          </div>
        ) : (
          <div className="flex w-full select-none flex-col items-center justify-center space-y-4">
            <Image
              src="/file.png"
              alt=""
              height={112}
              width={92}
              draggable={false}
              className="opacity-25 grayscale"
            />
            <p className="text-[#737373]">Open a file to preview it here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Snippy
