import Home from '@/components/home'
import { getTemplates } from '@/server/actions/template.actions'
import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'
import { funFacts } from '@/constants/funFacts'
import { LightBulbIcon } from '@heroicons/react/24/solid'

const HomePage = async () => {
  const session = await getServerAuthSession()

  if (!session?.user) return redirect('/login')

  const templates = await getTemplates()
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)]

  return (
    <main id="main" className="w-full overflow-y-auto">
      <div className="mx-auto flex min-h-full max-w-screen-lg flex-col px-4 py-16">
        <div className="mb-9">
          <h2 className="mb-2 text-2xl font-semibold">Your Snippys</h2>
          <div className="flex items-center space-x-2">
            <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] bg-[#282828]">
              <LightBulbIcon className="h-[14px] w-[14px] text-[#737373]" />
            </div>
            <p className="text-[15px] font-medium text-[#868686]">{randomFact}</p>
          </div>
        </div>

        <Home initialTemplates={templates} />
      </div>
    </main>
  )
}

export default HomePage
