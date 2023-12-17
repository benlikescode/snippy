import * as vscode from 'vscode'
import { TemplateFolderStructure } from '../types'
import * as fs from 'fs'

const createFileInVSCode = async (fileItem: TemplateFolderStructure) => {
  if (!fileItem) {
    return
  }

  const { type, path, content } = fileItem

  if (type === 'folder') {
    return await buildFolderStructure(content)
  }

  const doesFileAlreadyExist = fs.existsSync(path)
  const formattedPath = path.replace(/\\/g, '/')

  if (doesFileAlreadyExist) {
    const choices = ['Overwrite', 'Keep Existing']

    const choice = await vscode.window.showInformationMessage(`File ${formattedPath} already exists`, ...choices)

    if (choice === choices[1]) return
  }

  await vscode.workspace.fs.writeFile(vscode.Uri.file(path), new TextEncoder().encode(content))
}

export const buildFolderStructure = async (folderStructure: TemplateFolderStructure[]) => {
  for (const fileItem of folderStructure) {
    await createFileInVSCode(fileItem)
  }
}
