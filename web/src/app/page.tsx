import HomeCards from '@/components/home-cards'
import { getServerAuthSession } from '@/server/auth'
import { redirect } from 'next/navigation'

const HomePage = async () => {
  const session = await getServerAuthSession()

  if (!session?.user) return redirect('/login')

  return (
    <main id="main" className="w-full overflow-y-auto">
      <div className="mx-auto my-16 max-w-screen-lg px-4">
        <div>
          <h2 className="mb-2 text-2xl font-bold">Welcome Back</h2>
          <p className="text-[#868686]">Speed up component creation & usage.</p>
        </div>

        <HomeCards />
      </div>
    </main>
  )
}

export default HomePage
