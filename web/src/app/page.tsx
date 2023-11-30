import HomeCards from '@/components/home-cards'
import { getServerAuthSession } from '@/server/auth'
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

  return (
    <main id="main" className="w-full overflow-y-auto">
      <div className="mx-auto my-16 max-w-screen-lg px-4">
        <div>
          <h2 className="mb-2 text-2xl font-bold">{getGreeting()}</h2>
          <p className="text-[#868686]">Speed up component creation & usage.</p>
        </div>

        <HomeCards />
      </div>
    </main>
  )
}

export default HomePage
