import * as vscode from 'vscode'
import { TemplateFolderStructure } from '../types'

const createFileInVSCode = async (fileItem: TemplateFolderStructure) => {
  if (!fileItem) {
    return
  }

  const { type, path, content } = fileItem

  if (type === 'folder') {
    return await buildFolderStructure(content)
  }

  // TODO - Check if file already exists at path
  await vscode.workspace.fs.writeFile(vscode.Uri.file(path), new TextEncoder().encode(content))
}

export const buildFolderStructure = async (folderStructure: TemplateFolderStructure[]) => {
  for (const fileItem of folderStructure) {
    await createFileInVSCode(fileItem)
  }
}
