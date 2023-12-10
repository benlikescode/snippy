import Home from '@/components/home'
import { getTemplates } from '@/server/actions/template.actions'
import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'

const HomePage = async () => {
  const session = await getServerAuthSession()

  if (!session?.user) return redirect('/login')

  const templates = await getTemplates()

  return <Home initialTemplates={templates} />
}

export default HomePage
