import * as vscode from 'vscode'

export const GITHUB_AUTH_PROVIDER_ID = 'github'
export const SCOPES = ['user:email']

export const getAccessToken = async () => {
  const session = await vscode.authentication.getSession(GITHUB_AUTH_PROVIDER_ID, SCOPES)

  if (!session?.accessToken) {
    throw new Error('Please login with GitHub to use the Snippy extension')
  }

  return session.accessToken
}
