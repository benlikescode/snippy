import { useToast } from '@/components/ui/use-toast'
import useFileStore from '@/stores/useFileStore'
import { type FileItemType } from '@/types'
import { type FC, type ChangeEvent, type KeyboardEvent, useEffect, useRef, useState } from 'react'

type Props = {
  item: FileItemType
  isEditing?: boolean
  setIsEditing: (isEditing: boolean) => void
}

const FileItemName: FC<Props> = ({ item, isEditing, setIsEditing }) => {
  const { id, data } = item

  const [name, setName] = useState(data.name)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { openFile, renameItem, deleteItem, updateItemData } = useFileStore()

  const handleSaveName = () => {
    const trimName = name.trim()

    if (!trimName) {
      return toast({ description: 'Name cannot be empty' })
    }

    renameItem(id, trimName)
    setIsEditing(false)
    setName(trimName)
    updateItemData(id, { justCreated: false })
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isEditing && e.key === 'Enter') {
      handleSaveName()
    }

    if (isEditing && data.justCreated && ['Escape', 'Esc'].includes(e.key)) {
      setIsEditing(false)
      deleteItem(item.id)
    }

    if (openFile?.id === item.id && e.key === 'F2') {
      setIsEditing(true)
    }
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleOnBlur = () => {
    setIsEditing(false)

    if (!name.trim()) {
      return deleteItem(item.id)
    }

    handleSaveName()
  }

  // Focus input on mount (timeout fixes issue with context menu event)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!inputRef.current) return

      inputRef.current.focus()
    }, 50)

    return () => clearTimeout(timeout)
  }, [inputRef, isEditing])

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={name}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        maxLength={100}
        className="ml-1 w-full rounded-[5px] bg-transparent p-1 text-sm text-[#dcdcdc] focus:bg-[#070707] focus:outline-none focus:ring-2 focus:ring-[#084986aa]"
      />
    )
  }

  return <span className="ml-2">{item.data.name}</span>
}

export default FileItemName
