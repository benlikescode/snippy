import fetch from 'node-fetch'
import { Workspace } from '../types'
import { Auth } from '../utils'
import { SNIPPY_API_URL } from '../constants'

export const getWorkspaces = async () => {
  const auth = new Auth()
  const session = await auth.getSession()

  const res = await fetch(`${SNIPPY_API_URL}/workspaces`, {
    headers: {
      authorization: session.accessToken,
    },
  })

  const data = await res.json()

  if (!data || !data.workspaces) {
    throw new Error('Failed to get your workspaces')
  }

  return data.workspaces as Workspace[]
}
