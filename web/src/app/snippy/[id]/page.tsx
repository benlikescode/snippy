import Snippy from '@/app/snippy/_components/snippy'
import { type FC } from 'react'
import { notFound, redirect } from 'next/navigation'
import { db } from '@/server/db'
import { getServerAuthSession } from '@/server/auth'

type Props = {
  params: { id: string }
}

const SnippyPage: FC<Props> = async ({ params: { id } }) => {
  if (!id) return notFound()

  const session = await getServerAuthSession()

  if (!session?.user) return redirect('/login')

  const snippy = await db.template.findFirst({
    where: {
      id,
      workspace: {
        user: {
          some: {
            id: session.user.id,
          },
        },
      },
    },
  })

  if (!snippy) return notFound()

  return <Snippy snippy={snippy} />
}

export default SnippyPage
