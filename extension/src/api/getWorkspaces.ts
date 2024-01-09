import fetch from 'node-fetch'
import { Workspace } from '../types'
import { getAccessToken } from '../utils'
import { SNIPPY_API_URL } from '../constants'

export const getWorkspaces = async () => {
  const accessToken = await getAccessToken()

  const res = await fetch(`${SNIPPY_API_URL}/workspaces`, {
    headers: {
      authorization: accessToken,
    },
  })

  const data = await res.json()

  if (!data || !data.workspaces) {
    throw new Error('Failed to get your workspaces')
  }

  return data.workspaces as Workspace[]
}
