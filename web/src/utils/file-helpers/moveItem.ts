import { appendItemToParent, cloneItem, deleteItem } from '@/utils/file-helpers'
import { type FileItemType } from '@/types'

const moveItem = (files: FileItemType[], item: FileItemType, newFolderId: string) => {
  // Need to make a copy with different id so we don't have duplicate ids after appending
  const itemCopy = cloneItem(item)

  if (!itemCopy) {
    return false
  }

  const moveItemToNewFolder = appendItemToParent(files, itemCopy, newFolderId)

  if (!moveItemToNewFolder) {
    return false
  }

  const newFiles = deleteItem(moveItemToNewFolder, item.id)

  if (!newFiles) {
    return false
  }

  return { newFiles, newItem: itemCopy }
}

export default moveItem
