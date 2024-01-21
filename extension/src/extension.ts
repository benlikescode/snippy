import * as vscode from 'vscode'
import { registerCommands, registerStatusBar } from './utils'

export const activate = async (context: vscode.ExtensionContext) => {
  console.log('Snippy extension is activated!')

  await registerStatusBar(context)
  registerCommands(context)
}

export const deactivate = () => {}
