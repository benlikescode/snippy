import { v4 as uuid } from 'uuid'
import type { FileType, FileItemType, FolderType } from '@/types'
import { appendItemToParent } from '@/utils/file-helpers'

export const constructFile = (data: FileType['data']): FileItemType => ({
  id: uuid(),
  type: 'file',
  data,
})

export const constructFolder = (data: FolderType['data']): FileItemType => ({
  id: uuid(),
  type: 'folder',
  data: {
    ...data,
    files: data.files.map((item: any) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      item.files?.length ? constructFolder(item) : constructFile(item),
    ),
  },
})

const createItem = (
  files: FileItemType[],
  type: 'file' | 'folder',
  data: FileItemType['data'],
  parentFolderId: string,
) => {
  const item =
    type === 'file'
      ? constructFile(data as FileType['data'])
      : constructFolder(data as FolderType['data'])

  const newFiles = appendItemToParent(files, item, parentFolderId)

  if (!newFiles) {
    return null
  }

  return newFiles
}

export default createItem
