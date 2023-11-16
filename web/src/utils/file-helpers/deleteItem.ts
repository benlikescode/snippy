import { getPathToItem } from '@/utils/file-helpers'
import { type FileItemType } from '@/types'

const deleteItem = (files: FileItemType[], id: string) => {
  const pathToItem = getPathToItem(files, id)

  if (!pathToItem?.length) {
    return null
  }

  // If item is in root, we can simply filter it out
  if (pathToItem.length === 1) {
    return files.filter((item) => item.id !== id)
  }

  // Otherwise, we find its parent folder and remove it from it's files
  const parentFolder = pathToItem[pathToItem.length - 2]

  if (parentFolder?.type !== 'folder') {
    return null
  }

  parentFolder.data.files = parentFolder.data.files.filter((item) => item.id !== id)

  return files
}

export default deleteItem
