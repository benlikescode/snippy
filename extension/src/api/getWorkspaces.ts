import fetch from 'node-fetch'
import { Workspace } from '../types'

const getWorkspaces = async (accessToken: string) => {
  const res = await fetch('http://localhost:3000/api/workspaces', {
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

export default getWorkspaces
