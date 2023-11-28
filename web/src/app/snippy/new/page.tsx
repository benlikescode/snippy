import Snippy from '@/app/snippy/_components/snippy'
import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'

const NewSnippyPage = async () => {
  const session = await getServerAuthSession()

  if (!session?.user) return redirect('/login')

  return <Snippy />
}

export default NewSnippyPage
