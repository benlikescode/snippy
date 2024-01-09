'use client'

import HomeCard from '@/components/home-card'
import HomeCardSkeleton from '@/components/home-card-skeleton'
import SortDropdown from '@/components/sort-dropdown'
import { Searchbar } from '@/components/ui/searchbar'
import { toast } from '@/components/ui/use-toast'
import { getTemplates } from '@/server/actions/template.actions'
import { type Template } from '@prisma/client'
import { type FC, useState, useEffect, useMemo, type ChangeEvent } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import debounce from 'lodash.debounce'
import Spinner from '@/components/spinner'

type Props = {
  initialTemplates: { templates: Template[]; hasMore: boolean }
}

const Home: FC<Props> = ({ initialTemplates }) => {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates.templates)
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(initialTemplates.hasMore)

  const [searchResults, setSearchResults] = useState<Template[]>([])
  const [searchPage, setSearchPage] = useState(1)
  const [searchHasMore, setSearchHasMore] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setTemplates(initialTemplates.templates)
    setHasMore(initialTemplates.hasMore)
    setPage(2)
    setSearchQuery('')
  }, [initialTemplates])

  const fetchTemplates = async () => {
    try {
      const res = await getTemplates({ page })

      setTemplates((prev) => [...prev, ...res.templates])
      setHasMore(res.hasMore)

      if (res.hasMore) {
        setPage((prev) => prev + 1)
      }
    } catch (err) {
      toast({ variant: 'destructive', description: (err as Error).message })
    }
  }

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (!query) return

    try {
      setIsSearching(true)

      const res = await getTemplates({ page: 1, query })

      setSearchResults(res.templates)
      setSearchHasMore(res.hasMore)

      if (res.hasMore) {
        setSearchPage(2)
      }
    } catch (err) {
      toast({ variant: 'destructive', description: (err as Error).message })
    } finally {
      setIsSearching(false)
    }
  }

  const debouncedSearch = useMemo(() => debounce(handleSearch, 300), [])

  const getNextSearchResults = async () => {
    try {
      const res = await getTemplates({ page: searchPage, query: searchQuery })

      setSearchResults((prev) => [...prev, ...res.templates])
      setSearchHasMore(res.hasMore)

      if (res.hasMore) {
        setSearchPage((prev) => prev + 1)
      }
    } catch (err) {
      toast({ variant: 'destructive', description: (err as Error).message })
    }
  }

  // Workspace has no templates
  if (!templates.length) {
    return (
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
    )
  }

  return (
    <>
      <div className="mb-5 flex items-center gap-3">
        <Searchbar
          placeholder="Search..."
          isSearching={isSearching}
          onChange={(e) => debouncedSearch(e)}
        />

        <SortDropdown templates={templates} setTemplates={setTemplates} />
      </div>

      {/* Searched and found results */}
      {searchQuery && !!searchResults.length && (
        <InfiniteScroll
          dataLength={searchResults.length}
          next={() => getNextSearchResults()}
          hasMore={searchHasMore}
          loader={
            <div className="mt-10 flex items-center justify-center">
              <Spinner />
            </div>
          }
          scrollableTarget="main"
          style={{ overflow: 'visible' }} // override default
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {searchResults.map((template) => (
              <HomeCard key={template.id} template={template} />
            ))}
          </div>
        </InfiniteScroll>
      )}

      {/* Searched and no results */}
      {searchQuery && !isSearching && !searchResults.length && (
        <div className="flex max-h-[550px] w-full flex-1 select-none items-center justify-center rounded-md border border-dashed bg-[#121212]">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#222] bg-[#181818] shadow-lg">
              <MagnifyingGlassIcon className="h-8 w-8 text-[#737373]" />
            </div>
            <p className=" text-[#737373]">{`No snippys found for "${searchQuery}"`}</p>
          </div>
        </div>
      )}

      {/* No search and results */}
      {!searchQuery && !!templates.length && (
        <InfiniteScroll
          dataLength={templates.length}
          next={() => fetchTemplates()}
          hasMore={hasMore}
          loader={
            <div className="mt-10 flex items-center justify-center">
              <Spinner />
            </div>
          }
          scrollableTarget="main"
          style={{ overflow: 'visible' }} // override default
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {templates.map((template) => (
              <HomeCard key={template.id} template={template} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </>
  )
}

export default Home
