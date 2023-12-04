import HomeCards from '@/components/home-cards'
import { funFacts } from '@/constants/funFacts'
import { getServerAuthSession } from '@/server/auth'
import { LightBulbIcon } from '@heroicons/react/24/solid'
import { redirect } from 'next/navigation'

const HomePage = async () => {
  const session = await getServerAuthSession()

  if (!session?.user) return redirect('/login')

  const getGreeting = () => {
    const currentHour = new Date().getHours()
    const greeting =
      currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening'

    if (!session.user.name) {
      return greeting
    }

    const name = session.user.name.split(' ')[0]

    return `${greeting} ${name}`
  }

  const getRandomFact = () => {
    return funFacts[Math.floor(Math.random() * funFacts.length)]
  }

  return (
    <main id="main" className="w-full overflow-y-auto">
      <div className="mx-auto my-16 max-w-screen-lg px-4">
        <div>
          <h2 className="mb-2 text-2xl font-medium">{getGreeting()}</h2>
          <div className="flex items-center space-x-2">
            <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] bg-[#282828]">
              <LightBulbIcon className="h-[14px] w-[14px] text-[#737373]" />
            </div>
            <p className="text-[15px] font-medium text-[#868686]">{getRandomFact()}</p>
          </div>
        </div>

        <HomeCards />
      </div>
    </main>
  )
}

export default HomePage
