import { headers } from 'next/headers'
import { db } from '@/server/db'

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
      members: {
        some: {
          user: {
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

  // Assume user has extension installed
  await db.user.updateMany({
    where: {
      accounts: {
        some: {
          providerAccountId: accountId.toString(),
        },
      },
    },
    data: {
      installedExtension: true,
    },
  })

  return Response.json({ workspaces })
}
