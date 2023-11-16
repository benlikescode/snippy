import { getPathToItem, sortFiles } from '@/utils/file-helpers'
import { type FileItemType } from '@/types'

const renameItem = (files: FileItemType[], id: string, newName: string) => {
  const pathToItem = getPathToItem(files, id)

  if (!pathToItem?.length) {
    return null
  }

  const item = pathToItem[pathToItem.length - 1]

  if (!item) {
    return null
  }

  item.data.name = newName

  sortFiles(files)

  return { newFiles: files, item }
}

export default renameItem
