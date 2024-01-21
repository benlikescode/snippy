import { redirect } from 'next/navigation'
import Snippy from '@/app/snippy/_components/snippy'
import { getServerAuthSession } from '@/server/auth'

const NewSnippyPage = async () => {
  const session = await getServerAuthSession()

  if (!session?.user) return redirect('/login')

  return <Snippy />
}

export default NewSnippyPage
