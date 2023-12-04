/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import HomeCard from '@/components/home-card'
import HomeCardSkeleton from '@/components/home-card-skeleton'
import SortDropdown from '@/components/sort-dropdown'
import { Searchbar } from '@/components/ui/searchbar'
import { toast } from '@/components/ui/use-toast'
import { getTemplates } from '@/server/actions/template.actions'
import useGlobalStore from '@/stores/useGlobalStore'
import { type Template } from '@prisma/client'
import { type FC, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LightBulbIcon } from '@heroicons/react/24/solid'

type Props = {
  username?: string | null
  randomFact?: string
}

const Home: FC<Props> = ({ username, randomFact }) => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const { activeWorkspace } = useGlobalStore()

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    fetchTemplates(true)
  }, [activeWorkspace])

  const fetchTemplates = async (isInitial?: boolean) => {
    if (!activeWorkspace) return

    const res = await getTemplates(activeWorkspace.id, isInitial ? 1 : page)

    if (res.error) {
      return toast({ variant: 'destructive', description: res.error.message })
    }

    if (isInitial) {
      setTemplates(res.templates)
      setPage(2)
    } else {
      setTemplates((prev) => [...prev, ...res.templates])
      setPage((prev) => prev + 1)
    }

    setHasMore(res.hasMore)
  }

  const getGreeting = () => {
    const currentHour = new Date().getHours()
    const greeting =
      currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening'

    if (!username) {
      return greeting
    }

    const name = username.split(' ')[0]

    return `${greeting} ${name}`
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
            <p className="text-[15px] font-medium text-[#868686]">{randomFact}</p>
          </div>
        </div>

        <div className="mb-5 mt-9 flex items-center gap-3">
          <Searchbar
            placeholder="Find templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <SortDropdown templates={templates} setTemplates={setTemplates} />
        </div>

        <InfiniteScroll
          dataLength={templates.length}
          next={() => fetchTemplates()}
          hasMore={hasMore}
          loader={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '1rem',
              }}
            >
              loading...
            </div>
          }
          scrollableTarget="main"
          style={{ overflow: 'visible' }} // override default
          className="grid grid-cols-3 gap-5"
        >
          {!filteredTemplates.length &&
            Array.from({ length: 6 }, (_, idx) => <HomeCardSkeleton key={idx} />)}

          {filteredTemplates.map((template) => (
            <HomeCard key={template.id} template={template} />
          ))}
        </InfiniteScroll>
      </div>
    </main>
  )
}

export default Home
