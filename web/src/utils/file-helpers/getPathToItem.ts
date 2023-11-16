import { type FileItemType } from '@/types'

const getPathToItem = (
  files: FileItemType[],
  id: string,
  path: FileItemType[] = [],
): FileItemType[] | null => {
  if (!id) {
    return null
  }

  for (const item of files) {
    if (item.id === id) {
      return [...path, item]
    }

    // If folder => recurse on nested items
    if (item.type === 'folder') {
      const foundItem = getPathToItem(item.data.files, id, [...path, item])

      if (foundItem) {
        return foundItem
      }
    }
  }

  return null
}

export default getPathToItem
