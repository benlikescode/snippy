import Snippy from '@/app/snippy/_components/snippy'
import { type FC } from 'react'
import { notFound } from 'next/navigation'
import { db } from '@/server/db'

type Props = {
  params: { id: string }
}

const SnippyPage: FC<Props> = async ({ params: { id } }) => {
  if (!id) return notFound()

  const snippy = await db.template.findFirst({
    where: {
      id,
    },
  })

  if (!snippy) return notFound()

  console.log(snippy)

  return <Snippy snippy={snippy} />
}

export default SnippyPage
