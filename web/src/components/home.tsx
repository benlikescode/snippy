'use client'

import HomeCard from '@/components/home-card'
import HomeCardSkeleton from '@/components/home-card-skeleton'
import SortDropdown from '@/components/sort-dropdown'
import { Searchbar } from '@/components/ui/searchbar'
import { toast } from '@/components/ui/use-toast'
import { getTemplates } from '@/server/actions/template.actions'
import { type Template } from '@prisma/client'
import { type FC, useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { MagnifyingGlassIcon, LightBulbIcon } from '@heroicons/react/24/solid'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
  initialTemplates: { templates: Template[]; hasMore: boolean }
  randomFact: string
}

const Home: FC<Props> = ({ initialTemplates, randomFact }) => {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates.templates)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialTemplates.hasMore)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    setTemplates(initialTemplates.templates)
    setHasMore(initialTemplates.hasMore)
  }, [initialTemplates])

  const fetchTemplates = async () => {
    try {
      const res = await getTemplates(page)

      setTemplates((prev) => [...prev, ...res.templates])
      setPage((prev) => prev + 1)
      setHasMore(res.hasMore)
    } catch (err) {
      toast({ variant: 'destructive', description: (err as Error).message })
    }
  }

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

        {!!templates.length ? (
          <>
            <div className="mb-5 flex items-center gap-3">
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
          </>
        ) : (
          <div className="flex max-h-[550px] w-full flex-1 select-none items-center justify-center rounded-md border border-dashed bg-[#121212]">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#222] bg-[#181818] shadow-lg">
                <MagnifyingGlassIcon className="h-8 w-8 text-[#737373]" />
              </div>
              <p className=" text-[#737373]">{`This workspace does not have any snippys.`}</p>
              <Link href="/snippy/new?firstSnippy=1">
                <Button size="lg" className="px-6">
                  Create First Snippy
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Home
