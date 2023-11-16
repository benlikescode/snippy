import { createItem } from '@/utils/file-helpers'
import type { FileItemType, FileDataType } from '@/types'

const createNewFile = (files: FileItemType[], parentFolderId?: string) => {
  const fileData: FileDataType = {
    name: '',
    language: '',
    content: '',
    justCreated: true,
  }

  return createItem(files, 'file', fileData, parentFolderId ?? '')
}

export default createNewFile
