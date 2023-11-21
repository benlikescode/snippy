export type Template = {
  id: string
  name: string
  prompts: Prompt[]
  files: FileItem[]
  createdAt: Date
  updatedAt: Date
  creatorId: string
  workspaceId: string
}

export type Prompt = {
  id: string
  prompt: string
  variable: string
}

export type FileItem = FileType | Folder

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

export type Folder = {
  type: 'folder'
  id: string
  data: {
    name: string
    files: FileItem[]
    justCreated?: boolean
  }
}

export type Snippet = {
  id: string
  name: string
  description?: string
  content: string
  workspaceId: string
  creatorId: string
}

export type PromptResults = {
  [key: string]: string
}

export type TemplateFolderStructure =
  | {
      type: 'file'
      path: string
      content: string
    }
  | {
      type: 'folder'
      path: string
      content: TemplateFolderStructure[]
    }
