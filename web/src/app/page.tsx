import Home from '@/components/home'
import { funFacts } from '@/constants/funFacts'
import { getServerAuthSession } from '@/server/auth'
import { db } from '@/server/db'
import { redirect } from 'next/navigation'

const HomePage = async () => {
  const session = await getServerAuthSession()

  if (!session?.user) return redirect('/login')

  const getRandomFact = () => {
    return funFacts[Math.floor(Math.random() * funFacts.length)]
  }

  const templates = await getTemplates()

  return (
    <Home username={session.user.name} randomFact={getRandomFact()} initialTemplates={templates} />
  )
}

export const getTemplates = async () => {
  const session = await getServerAuthSession()

  if (!session?.user.id) {
    throw new Error('Unauthorized')
  }

  return await db.template.findMany({
    where: {
      workspace: {
        members: {
          some: {
            isActive: true,
            userId: session.user.id,
          },
        },
      },
    },
    take: 18,
    orderBy: { updatedAt: 'desc' },
  })
}

export default HomePage
