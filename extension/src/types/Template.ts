type Template = {
  id: string
  name: string
  description?: string
  prompts: Prompt[]
  files: File[]
  creatorId: string
  workspaceId: string
}

export type Prompt = {
  prompt: string
  variable: string
}

export type File =
  | {
      id: string
      type: 'folder'
      data: Folder
    }
  | {
      id: string
      type: 'file'
      data: FileData
    }

export type Folder = {
  name: string
  files: File[]
}

export type FileData = {
  name: string
  content: string
  language: string
}

export default Template
