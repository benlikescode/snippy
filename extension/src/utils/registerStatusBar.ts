import * as vscode from 'vscode'
import { Workspace } from '../types'
import { getWorkspaces } from '../api'
import { handleAuthPrompt, GITHUB_AUTH_PROVIDER_ID } from './auth'

export const registerStatusBar = async (context: vscode.ExtensionContext) => {
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
  statusBarItem.show()
  context.subscriptions.push(statusBarItem)

  const setStatusBarText = (newWorkspace: Workspace) => {
    if (!newWorkspace) return

    statusBarItem.text = `$(organization) ${newWorkspace.name}`
  }

  const handleLogin = async () => {
    try {
      handleAuthPrompt()

      statusBarItem.command = 'snippy.selectWorkspace'

      const workspaces = await getWorkspaces()

      const savedWorkspace = context.globalState.get('currWorkspace') as Workspace | undefined
      const stillMemberOfSavedWorkspace =
        savedWorkspace && workspaces.some((workspace) => workspace.id === savedWorkspace.id)

      if (!stillMemberOfSavedWorkspace) {
        context.globalState.update('currWorkspace', workspaces[0])
      }

      setStatusBarText(stillMemberOfSavedWorkspace ? savedWorkspace : workspaces[0])
    } catch (err) {
      statusBarItem.command = 'snippy.handleLogin'
      statusBarItem.text = 'Login To Snippy'
    }
  }

  context.subscriptions.push(
    vscode.commands.registerCommand('snippy.selectWorkspace', async () => {
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
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('snippy.handleLogin', async () => {
      await handleLogin()
    })
  )

  context.subscriptions.push(
    vscode.authentication.onDidChangeSessions(async (e) => {
      if (e.provider.id === GITHUB_AUTH_PROVIDER_ID) {
        await handleLogin()
      }
    })
  )

  await handleLogin()
}
