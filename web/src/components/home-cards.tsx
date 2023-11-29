'use client'

import HomeCard from '@/components/home-card'
import HomeCardSkeleton from '@/components/home-card-skeleton'
import SortDropdown from '@/components/sort-dropdown'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { getTemplates } from '@/server/actions/template.actions'
import useGlobalStore from '@/stores/useGlobalStore'
import { type Template } from '@prisma/client'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const HomeCards = () => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const { activeWorkspace } = useGlobalStore()

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const fetchTemplates = async () => {
    if (!activeWorkspace) return

    const res = await getTemplates(activeWorkspace.id, page)

    if (res.error) {
      return toast({ variant: 'destructive', description: res.error.message })
    }

    setTemplates((prev) => [...prev, ...res.templates])
    setHasMore(res.hasMore)
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchTemplates()
  }, [activeWorkspace])

  return (
    <>
      <div className="mb-5 mt-9 flex items-center gap-3">
        <Input
          type="search"
          placeholder="Find templates..."
          className="h-[42px] flex-1 rounded-[5px] border border-[#323232] bg-[#26262635] text-[#737373]"
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
        className="grid grid-cols-3 gap-5"
      >
        {!filteredTemplates.length &&
          Array.from({ length: 6 }, (_, idx) => <HomeCardSkeleton key={idx} />)}

        {filteredTemplates.map((template) => (
          <HomeCard key={template.id} template={template} />
        ))}
      </InfiniteScroll>
    </>
  )
}

export default HomeCards
