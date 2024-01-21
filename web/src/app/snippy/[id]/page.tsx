import { type FC } from 'react'
import { notFound, redirect } from 'next/navigation'
import Snippy from '@/app/snippy/_components/snippy'
import { getServerAuthSession } from '@/server/auth'
import { db } from '@/server/db'

type Props = {
  params: { id: string }
}

const SnippyPage: FC<Props> = async ({ params: { id } }) => {
  if (!id) return notFound()

  const session = await getServerAuthSession()

  if (!session?.user) {
    return redirect('/login')
  }

  const snippy = await getTemplate(id, session.user.id)

  if (!snippy) {
    return notFound()
  }

  return <Snippy snippy={snippy} />
}

export type TemplateWithInfo = Awaited<ReturnType<typeof getTemplate>>

const getTemplate = async (templateId: string, userId: string) => {
  return db.template.findFirst({
    where: {
      id: templateId,
      workspace: {
        members: {
          some: {
            userId,
          },
        },
      },
    },
    include: {
      updatedBy: true,
      creator: true,
    },
  })
}

export default SnippyPage
