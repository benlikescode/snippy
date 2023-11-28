import Folder from '@/app/snippy/_components/file-system/folder'
import { Button } from '@/components/ui/button'
import useFileStore from '@/stores/useFileStore'
import { type FileItemType } from '@/types'
import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DocumentPlusIcon, FolderPlusIcon } from '@heroicons/react/24/solid'

const FileSystem = () => {
  const [canDropFile, setCanDropFile] = useState(false)

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

  useEffect(() => {
    document.addEventListener('dragover', handleDragOver)

    return () => {
      document.removeEventListener('dragover', handleDragOver)
    }
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex-1 overflow-y-auto border-t bg-[#070707]">
        <div className="flex h-[63px] items-center justify-between border-b px-[22px] text-[#767676]">
          <h2 className="text-[15px] font-semibold">Template Structure</h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => createNewFile()}>
              <DocumentPlusIcon className="h-5 text-[#484848]" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => createNewFolder()}>
              <FolderPlusIcon className="h-5 text-[#484848]" />
            </Button>
          </div>
        </div>

        <div className="h-[calc(100%_-_63px)] overflow-y-auto p-2.5">
          <Folder item={ROOT_FOLDER} canDropFile={canDropFile} isRoot level={-1} />
        </div>
      </div>
    </DndProvider>
  )
}

export default FileSystem
