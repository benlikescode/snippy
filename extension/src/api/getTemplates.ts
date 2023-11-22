import fetch from 'node-fetch'
import * as vscode from 'vscode'
import { Template, Workspace } from '../types'
import { Auth } from '../utils/auth'

const getTemplates = async (context: vscode.ExtensionContext) => {
  const currWorkspace = context.globalState.get('currWorkspace') as Workspace
  const auth = new Auth()
  const session = await auth.getSession()

  const res = await fetch(`http://localhost:3000/api/templates?workspaceId=${currWorkspace.id}`, {
    headers: {
      authorization: session.accessToken,
    },
  })

  const data = await res.json()

  if (!data || !data.templates) {
    throw new Error('Failed to get your templates')
  }

  return data.templates as Template[]
}

export default getTemplates