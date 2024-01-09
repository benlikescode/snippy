import * as vscode from 'vscode'
import { registerStatusBar } from './registerStatusBar'

const GITHUB_AUTH_PROVIDER_ID = 'github'
const SCOPES = ['user:email']

export class Auth {
  private session: vscode.AuthenticationSession | undefined

  async initialize(context: vscode.ExtensionContext): Promise<void> {
    this.registerListeners(context)
    this.setSession(context)
  }

  private async setSession(context: vscode.ExtensionContext) {
    const session = await vscode.authentication.getSession(GITHUB_AUTH_PROVIDER_ID, SCOPES, { createIfNone: true })

    if (session) {
      this.session = session

      registerStatusBar(context)

      return
    }

    this.session = undefined
  }

  registerListeners(context: vscode.ExtensionContext): void {
    /**
     * Sessions are changed when a user logs in or logs out.
     */
    context.subscriptions.push(
      vscode.authentication.onDidChangeSessions(async (e) => {
        if (e.provider.id === GITHUB_AUTH_PROVIDER_ID) {
          await this.setSession(context)
        }
      })
    )
  }

  async getSession(): Promise<vscode.AuthenticationSession> {
    if (this.session) {
      return this.session
    }

    /**
     * When the `createIfNone` flag is passed, a modal dialog will be shown asking the user to sign in.
     * Note that this can throw if the user clicks cancel.
     */
    const session = await vscode.authentication.getSession(GITHUB_AUTH_PROVIDER_ID, SCOPES, { createIfNone: true })
    this.session = session

    return this.session
  }
}
