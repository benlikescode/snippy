import { type FileItemType } from '@/types'
import { getPathToItem } from '@/utils/file-helpers'

const getFormattedPath = (files: FileItemType[], id: string) => {
  if (!id) {
    return null
  }

  const arrayPath = getPathToItem(files, id)
  if (!arrayPath) return null

  return arrayPath.map((item) => item.data.name)
}

export default getFormattedPath
