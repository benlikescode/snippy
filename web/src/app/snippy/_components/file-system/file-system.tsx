import { type FC, type UIEvent, useEffect, useState } from 'react'
import { DocumentPlusIcon, FolderPlusIcon } from '@heroicons/react/24/solid'
import Folder from '@/app/snippy/_components/file-system/folder'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import useFileStore from '@/stores/useFileStore'
import { type FileItemType } from '@/types'
import { cn } from '@/utils/cn'

type Props = {
  noFiles?: boolean
}

const FileSystem: FC<Props> = ({ noFiles }) => {
  const [canDropFile, setCanDropFile] = useState(false)
  const [showSeparator, setShowSeparator] = useState(false)

  const { files, createNewFile, createNewFolder } = useFileStore()

  const ROOT_FOLDER: FileItemType = {
    id: '',
    type: 'folder',
    data: {
      name: 'ROOT_FOLDER',
      files: files,
    },
  }

  const handleDragOver = (e: DragEvent) => {
    const dt = e?.dataTransfer?.types

    if (!dt?.length || dt[0] !== 'Files') {
      return setCanDropFile(false)
    }

    setCanDropFile(true)
  }

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    setShowSeparator(e.currentTarget.scrollTop > 0)
  }

  useEffect(() => {
    document.addEventListener('dragover', handleDragOver)

    return () => {
      document.removeEventListener('dragover', handleDragOver)
    }
  }, [])

  return (
    <div className="flex-1 overflow-y-auto border-t bg-[#070707]">
      <div
        className={cn(
          'flex h-[64px] items-center justify-between border-b border-transparent px-[22px] text-[#767676]',
          showSeparator && 'border-border',
        )}
      >
        <h2 className="text-[15px] font-semibold">Template Structure</h2>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => createNewFile()}>
                <DocumentPlusIcon className="h-5 text-[#484848]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create new file</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => createNewFolder()}>
                <FolderPlusIcon className="h-5 text-[#484848]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create new folder</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="h-[calc(100%_-_64px)] overflow-y-auto" onScroll={handleScroll}>
        <div className="h-full min-h-full p-2.5 pt-0">
          <Folder
            item={ROOT_FOLDER}
            canDropFile={canDropFile}
            isRoot
            level={-1}
            noFiles={noFiles}
          />
        </div>
      </div>
    </div>
  )
}

export default FileSystem
