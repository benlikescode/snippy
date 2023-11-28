/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/ui/button'
import { useEffect, type FC } from 'react'
import NameInput from './name-input'
import FileSystem from './file-system/file-system'
import useFileStore from '@/stores/useFileStore'
import { ChevronRightIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
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
        <NameInput />

        <div className="flex items-center gap-3">
          {/* <Button size="lg" variant="secondary" onClick={() => setDefaultState()}>
            Reset
          </Button> */}
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
          {/* <div className="flex h-[76px] items-center justify-between border-t p-4">
            <Button size="lg" variant="secondary" onClick={() => setDefaultState()}>
              Reset
            </Button>
            <Button size="lg" onClick={() => (snippy ? handleSaveChanges() : handleCreateSnippy())}>
              {snippy ? 'Save Changes' : 'Create Snippy'}
            </Button>
          </div> */}
          {/* <div className="flex h-[76px] items-center justify-between border-t p-4">
             <Button size="lg" variant="secondary" onClick={() => setDefaultState()}>
              Close
            </Button> 
             <Button size="lg" onClick={() => (snippy ? handleSaveChanges() : handleCreateSnippy())}>
              {snippy ? 'Save Changes' : 'Create Snippy'}
            </Button>
          </div> */}
        </div>

        {!!pathToOpenFile.length ? (
          <div className="h-full w-full">
            <div className="grid h-full">
              <div className="flex h-12 items-center bg-[#0c0c0c] px-4 text-sm font-medium text-[#bababa]">
                {/* <CodeBracketIcon className="mr-2 h-5 w-5 stroke-[2px] text-[#767676]" /> */}
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
            <img
              src="https://ouch-cdn2.icons8.com/L-B_mliBi32AZfMGvy3XqvLQarALlRoEMptXN-jHjyg/rs:fit:368:444/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTc3/Lzg3ZGU1NTFjLWNl/NzctNDE1OS05MjQ1/LThmYzJiNzM3ZDBk/ZC5zdmc.png"
              alt=""
              className="h-28 opacity-25 grayscale"
              draggable={false}
            />
            <p className="text-[#737373]">Open a file to preview it here</p>
          </div>
        )}
      </div>
    </div>
  )

  // return (
  //   <div className="flex h-full w-full">
  //     <div className="flex w-[450px] shrink-0 flex-col justify-between border-r">
  //       <div className="max-h-[350px] overflow-y-auto">
  //         <div
  //           className={cn(
  //             'sticky top-0 flex h-[76px] items-center border-b border-transparent bg-background px-[30px]',
  //             showHeaderBorder && 'border-border',
  //           )}
  //         >
  //           <NameInput />
  //         </div>

  //         <div className="px-[30px] pb-[30px]">
  //           <div className="mb-4 space-y-3">
  //             {prompts.map((prompt) => (
  //               <PromptItem key={prompt.variable} prompt={prompt} />
  //             ))}
  //           </div>

  //           <NewPrompt />
  //         </div>
  //       </div>

  //       <FileSystem />

  //       <div className="flex h-[76px] items-center justify-between border-t p-4">
  //         <Button size="lg" variant="secondary" onClick={() => setDefaultState()}>
  //           Reset
  //         </Button>
  //         <Button size="lg" onClick={() => (snippy ? handleSaveChanges() : handleCreateSnippy())}>
  //           {snippy ? 'Save Changes' : 'Create Snippy'}
  //         </Button>
  //       </div>
  //     </div>

  //     <div className="h-full w-full">
  //       <div className="grid h-full bg-[#070707]">
  //         <div className="flex h-[50px] items-center border-b px-3 text-sm font-medium text-[#A3A3A3]">
  //           {pathToOpenFile.map((str, idx) => (
  //             <div key={idx} className="flex items-center">
  //               {idx !== 0 && <ChevronRightIcon className="h-4" />}
  //               {str}
  //             </div>
  //           ))}

  //           {!pathToOpenFile.length && (
  //             <span className=" text-[#717171]">Open a file to view it here</span>
  //           )}
  //         </div>
  //         <div>
  //           <CodeEditor />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default Snippy
