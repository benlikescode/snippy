import Home from '@/components/home'
import { getTemplates } from '@/server/actions/template.actions'
import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'
import { funFacts } from '@/constants/funFacts'

const HomePage = async () => {
  const session = await getServerAuthSession()

  if (!session?.user) return redirect('/login')

  const templates = await getTemplates()
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)]

  return <Home initialTemplates={templates} randomFact={randomFact ?? ''} />
}

export default HomePage
