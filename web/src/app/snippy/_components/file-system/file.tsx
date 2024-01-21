import { type FC, useEffect, useState } from 'react'
import { useDrag } from 'react-dnd'
import { DocumentIcon } from '@heroicons/react/24/outline'
import FileItemName from '@/app/snippy/_components/file-system/file-item-name'
import useFileStore from '@/stores/useFileStore'
import { type FileItemType } from '@/types'
import { cn } from '@/utils/cn'
import { getFormattedPath } from '@/utils/file-helpers'
import FileContextMenu from './file-context-menu'

type Props = {
  item: FileItemType
  level: number
}

const File: FC<Props> = ({ item, level }) => {
  const [isActive, setIsActive] = useState(false)
  const [isEditing, setIsEditing] = useState(item.data.justCreated)

  const { files, openFile, setOpenFile, setPathToOpenFile } = useFileStore()

  useEffect(() => {
    setIsActive(openFile?.id === item.id)
  }, [openFile?.id])

  const [_, drag] = useDrag({
    type: 'file',
    item: () => {
      if (isEditing) return

      return { item, type: 'file' }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const handleFileClick = () => {
    setOpenFile(item)

    const formattedPathToFile = getFormattedPath(files, item.id)

    if (formattedPathToFile) {
      setPathToOpenFile(formattedPathToFile)
    }
  }

  return (
    <div ref={drag}>
      <FileContextMenu item={item} setIsActive={setIsActive} setIsEditing={setIsEditing}>
        <div
          className={cn(
            'flex h-8 cursor-pointer select-none items-center rounded-[5px] bg-transparent text-sm text-[#dcdcdc] hover:bg-[#333333aa]',
            isActive && 'bg-[#084986aa] hover:bg-[#084986aa]',
          )}
          style={{ paddingLeft: 10 + 12 * level }}
          onClick={() => handleFileClick()}
        >
          <DocumentIcon className="h-5 w-5 shrink-0 text-[#737373]" />
          <FileItemName item={item} isEditing={isEditing} setIsEditing={setIsEditing} />
        </div>
      </FileContextMenu>
    </div>
  )
}

export default File
