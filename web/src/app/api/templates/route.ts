import type { NextRequest } from 'next/server'
import { db } from '@/server/db'
import { headers } from 'next/headers'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const workspaceId = searchParams.get('workspaceId')

  if (!workspaceId) {
    return Response.json({ error: 'No workspace id provided' }, { status: 404 })
  }

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

  const templates = await db.template.findMany({
    where: {
      workspace: {
        id: workspaceId,
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
    },
  })

  return Response.json({ templates })
}
