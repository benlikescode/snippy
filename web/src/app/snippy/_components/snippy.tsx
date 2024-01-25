'use client'

import { useEffect, type FC } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { type TemplateWithInfo } from '@/app/snippy/[id]/page'
import CodeEditor from '@/app/snippy/_components/code-editor'
import SnippyHeader from '@/app/snippy/_components/snippy-header'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import useFileStore from '@/stores/useFileStore'
import useSnippyStore from '@/stores/useSnippyStore'
import { type FileItemType, type PromptType } from '@/types'
import { cn } from '@/utils/cn'
import FileSystem from './file-system/file-system'
import Prompts from './prompts/prompts'

type Props = {
  snippy?: TemplateWithInfo
}

const Snippy: FC<Props> = ({ snippy }) => {
  const { pathToOpenFile, openFile, setFiles, setOpenFile, setPathToOpenFile } = useFileStore()
  const { setPrompts, setSnippyName } = useSnippyStore()

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

  return (
    <div className="h-full w-full grid grid-rows-[70px_minmax(0,_1fr)]">
      <SnippyHeader snippy={snippy} />

      <div className="flex">
        <div
          className={cn(
            'w-full shrink-0 bg-[#070707] md:w-[460px] md:border-r grid grid-rows-[auto_minmax(0,_1fr)]',
            openFile?.data.name && !!pathToOpenFile.length && 'hidden md:grid',
          )}
        >
          <Prompts />
          <FileSystem noFiles={snippy?.files ? !(snippy?.files as FileItemType[]).length : true} />
        </div>

        {openFile?.data.name && !!pathToOpenFile.length ? (
          <div className="h-full w-full">
            <div className="grid h-full grid-rows-[48px_auto]">
              <div className="flex items-center justify-between bg-[#0c0c0c] px-4 text-sm font-medium text-[#bababa]">
                <div className="flex items-center">
                  {pathToOpenFile.map((str, idx) => (
                    <div key={idx} className="flex items-center">
                      {idx !== 0 && (
                        <ChevronRightIcon className="h-4 stroke-[2px] text-[#767676]" />
                      )}
                      {str}
                    </div>
                  ))}
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setOpenFile(null)}
                    >
                      <HamburgerMenuIcon className="h-5 text-[#484848]" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open sidebar</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <CodeEditor />
            </div>
          </div>
        ) : (
          <div className="hidden w-full select-none flex-col items-center justify-center space-y-4 md:flex">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#222] bg-[#181818] shadow-lg">
              <MagnifyingGlassIcon className="h-8 w-8 text-[#737373]" />
            </div>
            <p className="text-[#737373]">Open a file to preview it here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Snippy
