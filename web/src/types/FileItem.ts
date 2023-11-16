export type FileItemType = FileType | FolderType

export type FileType = {
  type: 'file'
  id: string
  data: {
    name: string
    content: string
    language: string
    justCreated?: boolean
  }
}

export type FolderType = {
  type: 'folder'
  id: string
  data: {
    name: string
    files: FileItemType[]
    justCreated?: boolean
  }
}

export type FileDataType = FileType['data']
export type FolderDataType = FolderType['data']
