import type { FileItemType, FolderDataType } from '@/types'
import { createItem } from '@/utils/file-helpers'

const createNewFolder = (files: FileItemType[], parentFolderId?: string) => {
  const folderData: FolderDataType = {
    name: '',
    files: [],
    justCreated: true,
  }

  return createItem(files, 'folder', folderData, parentFolderId ?? '')
}

export default createNewFolder
