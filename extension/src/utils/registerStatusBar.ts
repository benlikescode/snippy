import * as vscode from 'vscode'
import { Workspace } from '../types'
import { getWorkspaces } from '../api'

let statusBarItem: vscode.StatusBarItem | undefined

const setStatusBarText = (newWorkspace: Workspace) => {
  if (!statusBarItem || !newWorkspace) return

  statusBarItem.text = `$(organization) ${newWorkspace.name}`
  statusBarItem.tooltip = `Change snippy workspace`
}

export const registerStatusBar = async (context: vscode.ExtensionContext) => {
  const workspaces = await getWorkspaces()

  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
  statusBarItem.command = 'snippy.selectWorkspace'

  const savedWorkspace = context.globalState.get('currWorkspace') as Workspace
  const stillMemberOfSavedWorkspace = workspaces.some((workspace) => workspace.id === savedWorkspace.id)

  if (!stillMemberOfSavedWorkspace) {
    context.globalState.update('currWorkspace', workspaces[0])
  }

  setStatusBarText(stillMemberOfSavedWorkspace ? savedWorkspace : workspaces[0])

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

    setStatusBarText(selectedWorkspace)
  })

  context.subscriptions.push(statusBarItem)
  context.subscriptions.push(onStatusBarClick)
}
