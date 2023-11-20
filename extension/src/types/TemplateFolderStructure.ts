type TemplateFolderStructure =
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

export default TemplateFolderStructure
