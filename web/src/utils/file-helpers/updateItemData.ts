import type { FileDataType, FileItemType } from '@/types'
import { getPathToItem } from '@/utils/file-helpers'

const updateItemData = (files: FileItemType[], id: string, newData: Partial<FileDataType>) => {
  const pathToItem = getPathToItem(files, id)

  if (!pathToItem?.length) {
    return null
  }

  const item = pathToItem[pathToItem.length - 1]

  if (!item) {
    return null
  }

  item.data = { ...item.data, ...newData }

  return files
}

export default updateItemData
