import * as vscode from 'vscode'
import { Auth, registerCommands, registerStatusBar, registerWebview } from './utils'

export const activate = async (context: vscode.ExtensionContext) => {
  console.log('Snippy extension is activated!')

  const auth = new Auth()
  await auth.initialize(context)

  registerStatusBar(context)
  registerCommands(context)
  registerWebview()
}

export const deactivate = () => {}
