import * as vscode from 'vscode'
import { registerCommands, registerStatusBar, registerHandlebars } from './utils'

export const activate = async (context: vscode.ExtensionContext) => {
  console.log('Snippy extension is activated!')

  await registerStatusBar(context)
  registerCommands(context)
  registerHandlebars()
}

export const deactivate = () => {}
