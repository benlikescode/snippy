import * as vscode from 'vscode'
import { addFileTemplate } from '../commands'

export const registerCommands = (context: vscode.ExtensionContext) => {
  const addTemplate = vscode.commands.registerCommand('snippy.addFileTemplate', (path) =>
    addFileTemplate(path, context)
  )

  context.subscriptions.push(addTemplate)
}
