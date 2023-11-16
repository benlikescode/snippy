import { type FileItemType } from '@/types'
import { v4 as uuid } from 'uuid'

// Creates a clone of the item with a new id

const cloneItem = (item: FileItemType) => {
  if (item.type === 'file') {
    return { ...item, id: uuid() }
  }

  const newFolder = { ...item, id: uuid() }
  newFolder.data.files.map((file) => cloneItem(file))

  return newFolder
}

export default cloneItem
