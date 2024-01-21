import { type FC, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Image from 'next/image'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import FileItemName from '@/app/snippy/_components/file-system/file-item-name'
import { Button } from '@/components/ui/button'
import { useFileDropzone } from '@/hooks'
import useFileStore from '@/stores/useFileStore'
import type { FolderType, FileItemType } from '@/types'
import { cn } from '@/utils/cn'
import FileContextMenu from './file-context-menu'
import FileSystemItem from './file-system-item'

type Props = {
  item: FolderType
  level: number
  canDropFile: boolean
  isRoot?: boolean
  noFiles?: boolean
}

type DragItem = {
  item: FileItemType
  type: string
}

const Folder: FC<Props> = ({ item, level, canDropFile, noFiles, isRoot = false }) => {
  const [isFolderOpen, setIsFolderOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(item.data.justCreated)

  const { files, fileDropzone, moveItem, createNewFile } = useFileStore()
  const { getRootProps, open } = useFileDropzone(item, canDropFile)

  const [_, drag] = useDrag({
    type: 'folder',
    canDrag: () => !isRoot,
    item: () => {
      if (isEditing) return

      return { item, type: 'folder' }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isHovering }, drop] = useDrop<DragItem, void, { isHovering: boolean }>({
    accept: ['file', 'folder'],
    collect: (monitor) => {
      return { isHovering: monitor.isOver({ shallow: true }) }
    },
    drop: (dragItem, monitor) => {
      if (dragItem.item.id !== item.id && monitor.canDrop() && monitor.isOver({ shallow: true })) {
        moveItem(dragItem.item, item.id)
      }
    },
  })

  return (
    <div
      {...getRootProps()}
      ref={(node) => drag(drop(node))}
      className={cn(
        'relative rounded-[5px]',
        isRoot && 'h-full',
        (isHovering || (fileDropzone === item.id && canDropFile)) && 'bg-[#181818]',
      )}
    >
      <FileContextMenu item={item} setIsFolderOpen={setIsFolderOpen} setIsEditing={setIsEditing}>
        {isRoot && noFiles && !files.length && (
          <div className="absolute inset-0 mx-auto flex h-full w-full max-w-[280px] select-none flex-col items-center justify-center">
            <Image
              src="/file.png"
              alt=""
              height={112}
              width={92}
              draggable={false}
              className="mb-4 opacity-20 grayscale"
            />

            <p className="mb-6 font-medium text-[#686868]">Drag and drop files or add manually</p>

            <div className="w-full space-y-2">
              <Button size="lg" className="w-full" onClick={() => createNewFile()}>
                Create File
              </Button>

              <Button size="lg" variant="secondary" className="w-full" onClick={open}>
                Upload File
              </Button>
            </div>
          </div>
        )}

        {!isRoot && (
          <>
            <div
              className="absolute bottom-0 left-[15px] h-[calc(100%_-_32px)] w-[1px] bg-[#363636]"
              style={{ left: 15 + 12 * level }}
            ></div>
            <div
              className="flex h-8 cursor-pointer select-none items-center rounded-[5px] bg-transparent text-sm text-[#dcdcdc] hover:bg-[#333333aa]"
              style={{ paddingLeft: 6 + 12 * level }}
              onClick={() => setIsFolderOpen(!isFolderOpen)}
            >
              {isFolderOpen ? (
                <ChevronDownIcon className="h-5 w-5 shrink-0 text-[#737373]" />
              ) : (
                <ChevronRightIcon className="h-5 w-5 shrink-0 text-[#737373]" />
              )}

              <FileItemName item={item} isEditing={isEditing} setIsEditing={setIsEditing} />
            </div>
          </>
        )}

        <div className="h-full">
          {(isFolderOpen || isRoot) &&
            item.data.files.map((nestedItem) => (
              <FileSystemItem
                key={nestedItem.id}
                item={nestedItem}
                canDropFile={canDropFile}
                level={level + 1}
              />
            ))}
        </div>
      </FileContextMenu>
    </div>
  )
}

export default Folder
