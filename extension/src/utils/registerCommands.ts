import * as vscode from 'vscode'
import { addCodeSnippet, addFileTemplate } from '../commands'

export const registerCommands = (context: vscode.ExtensionContext) => {
  const addTemplate = vscode.commands.registerCommand('snippy.addFileTemplate', (path) =>
    addFileTemplate(path, context)
  )

  const addSnippet = vscode.commands.registerCommand('snippy.addCodeSnippet', addCodeSnippet)

  context.subscriptions.push(addTemplate)
  context.subscriptions.push(addSnippet)
}
