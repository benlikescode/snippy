import fetch from 'node-fetch'
import * as vscode from 'vscode'
import { Template, Workspace } from '../types'
import { SNIPPY_API_URL } from '../constants'
import { getAccessToken } from '../utils'

export const getTemplates = async (context: vscode.ExtensionContext) => {
  const currWorkspace = context.globalState.get('currWorkspace') as Workspace | undefined

  if (!currWorkspace?.id) {
    throw new Error('Failed to link workspace. Please select a workspace and try again')
  }

  const accessToken = await getAccessToken()

  const res = await fetch(`${SNIPPY_API_URL}/templates?workspaceId=${currWorkspace.id}`, {
    headers: {
      authorization: accessToken,
    },
  })

  const data = await res.json()

  if (!data || !data.templates) {
    throw new Error('Failed to get your templates')
  }

  return data.templates as Template[]
}
