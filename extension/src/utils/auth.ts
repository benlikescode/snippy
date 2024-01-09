import * as vscode from 'vscode'

export const GITHUB_AUTH_PROVIDER_ID = 'github'
export const SCOPES = ['user:email']

export const handleAuthPrompt = async () => {
  await vscode.authentication.getSession(GITHUB_AUTH_PROVIDER_ID, SCOPES, { createIfNone: true })
}

export const getAccessToken = async () => {
  const session = await vscode.authentication.getSession(GITHUB_AUTH_PROVIDER_ID, SCOPES)

  return session?.accessToken || ''
}
