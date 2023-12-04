import Home from '@/components/home'
import { funFacts } from '@/constants/funFacts'
import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'

const HomePage = async () => {
  const session = await getServerAuthSession()

  if (!session?.user) return redirect('/login')

  const getRandomFact = () => {
    return funFacts[Math.floor(Math.random() * funFacts.length)]
  }

  return <Home username={session.user.name} randomFact={getRandomFact()} />
}

export default HomePage
