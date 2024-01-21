import * as vscode from 'vscode'
import { Workspace } from '../types'
import { getWorkspaces } from '../api'
import { GITHUB_AUTH_PROVIDER_ID, SCOPES } from './auth'
import { SNIPPY_SITE_URL } from '../constants'

export const registerStatusBar = async (context: vscode.ExtensionContext) => {
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
  statusBarItem.show()
  context.subscriptions.push(statusBarItem)

  const setStatusBarText = (newWorkspace: Workspace) => {
    if (!newWorkspace) return

    statusBarItem.text = `$(organization) ${newWorkspace.name}`
  }

  const fetchWorkspaces = async () => {
    const workspaces = await getWorkspaces()

    if (!workspaces.length) {
      statusBarItem.command = 'snippy.handleLogin'
      statusBarItem.text = 'Sync Snippy Account'

      const choices = ['Create Snippy Account', 'Later']

      const selection = await vscode.window.showErrorMessage(
        'No Snippy account linked to this GitHub profile.',
        ...choices
      )

      if (selection === choices[0]) {
        vscode.env.openExternal(vscode.Uri.parse(SNIPPY_SITE_URL))
      }

      return
    }

    return workspaces
  }

  const handleLogin = async (createIfNone = true) => {
    try {
      const session = await vscode.authentication.getSession(GITHUB_AUTH_PROVIDER_ID, SCOPES, {
        createIfNone: createIfNone,
      })

      if (!session) {
        statusBarItem.command = 'snippy.handleLogin'
        statusBarItem.text = 'Login To Snippy'

        return
      }

      const workspaces = await fetchWorkspaces()

      if (!workspaces) {
        return
      }

      statusBarItem.command = 'snippy.selectWorkspace'

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
      const workspaces = await fetchWorkspaces()

      if (!workspaces) {
        return
      }

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
        await handleLogin(false)
      }
    })
  )

  await handleLogin(false)
}
