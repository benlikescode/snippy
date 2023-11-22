import { db } from '@/server/db'
import { headers } from 'next/headers'

export const GET = async () => {
  const headersList = headers()
  const token = headersList.get('authorization')

  if (!token) {
    return Response.json({ error: 'Not Authorized' }, { status: 404 })
  }

  const res = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  })

  const data = await res.json()
  const accountId = data?.id

  if (!accountId || typeof accountId !== 'number') {
    return Response.json({ error: 'Failed to authenticate' }, { status: 404 })
  }

  const workspaces = await db.workspace.findMany({
    where: {
      user: {
        some: {
          accounts: {
            some: {
              providerAccountId: accountId.toString(),
            },
          },
        },
      },
    },
  })

  return Response.json({ workspaces })
}
