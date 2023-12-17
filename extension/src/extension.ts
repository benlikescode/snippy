import * as vscode from 'vscode'
import { getWorkspaces } from './api'
import { addCodeSnippet, addFileTemplate } from './commands'
import { Workspace } from './types'
import { Auth, registerWebview } from './utils'

const updateStatusBar = (newWorkspace: Workspace) => {
  if (!statusBarItem || !newWorkspace) return

  statusBarItem.text = `$(organization) ${newWorkspace.name}`
  statusBarItem.tooltip = `Change snippy workspace`
}

let statusBarItem: vscode.StatusBarItem | undefined

export const activate = async (context: vscode.ExtensionContext) => {
  console.log('Snippy extension is activated!')

  const auth = new Auth()
  await auth.initialize(context)

  const workspaces = await getWorkspaces()

  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
  statusBarItem.command = 'snippy.selectWorkspace'

  const savedWorkspace = context.globalState.get('currWorkspace') as Workspace
  const stillMemberOfSavedWorkspace = workspaces.some((workspace) => workspace.id === savedWorkspace.id)

  updateStatusBar(stillMemberOfSavedWorkspace ? savedWorkspace : workspaces[0])

  statusBarItem.show()

  const onStatusBarClick = vscode.commands.registerCommand('snippy.selectWorkspace', async () => {
    const workspaces = await getWorkspaces()

    const workspaceOptions = workspaces.map((workspace) => ({ ...workspace, label: workspace.name }))

    const selectedWorkspace = await vscode.window.showQuickPick(workspaceOptions, {
      placeHolder: 'Select your workspace',
    })

    if (!selectedWorkspace) {
      return
    }

    context.globalState.update('currWorkspace', selectedWorkspace)

    updateStatusBar(selectedWorkspace)
  })

  context.subscriptions.push(statusBarItem)
  context.subscriptions.push(onStatusBarClick)

  const addTemplate = vscode.commands.registerCommand('snippy.addFileTemplate', (path) =>
    addFileTemplate(path, context)
  )

  const addSnippet = vscode.commands.registerCommand('snippy.addCodeSnippet', addCodeSnippet)

  context.subscriptions.push(addTemplate)
  context.subscriptions.push(addSnippet)

  registerWebview()
}

export const deactivate = () => {
  if (statusBarItem) {
    statusBarItem.dispose()
  }
}
