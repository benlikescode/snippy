import { getPathToItem } from '@/utils/file-helpers'
import { type FileItemType } from '@/types'

const getFormattedPath = (files: FileItemType[], id: string) => {
  if (!id) {
    return null
  }

  const arrayPath = getPathToItem(files, id)
  if (!arrayPath) return null

  return arrayPath.map((item) => item.data.name)
}

export default getFormattedPath
