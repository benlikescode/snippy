import { getPathToItem, sortFiles, validateName } from '@/utils/file-helpers'
import { type FileItemType } from '@/types'

const appendItemToParent = (files: FileItemType[], item: FileItemType, parentFolderId: string) => {
  // Add to root
  if (!parentFolderId) {
    if (!validateName(files, item)) {
      return false
    }

    files.push(item)
    sortFiles(files)

    return files
  }

  // Otherwise, get path to parent folder and append item
  const pathToParentFolder = getPathToItem(files, parentFolderId)

  if (!pathToParentFolder?.length) {
    return null
  }

  const parentFolder = pathToParentFolder[pathToParentFolder.length - 1]

  if (parentFolder?.type !== 'folder') {
    return null
  }

  if (!validateName(parentFolder.data.files, item)) {
    return false
  }

  parentFolder.data.files.push(item)
  sortFiles(parentFolder.data.files)

  return files
}

export default appendItemToParent
