'use client'

import HomeCard from '@/components/home-card'
import SortDropdown from '@/components/sort-dropdown'
import { Input } from '@/components/ui/input'
import { getTemplates } from '@/server/actions/template.actions'
import useGlobalStore from '@/stores/useGlobalStore'
import { type Template } from '@prisma/client'
import { useEffect, useState } from 'react'

const HomePage = () => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const { activeWorkspace } = useGlobalStore()

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const fetchTemplates = async () => {
    if (!activeWorkspace) return

    const templates = await getTemplates(activeWorkspace.id)

    const sortedTemplates = templates.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )

    setTemplates(sortedTemplates)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchTemplates()
  }, [activeWorkspace])

  return (
    <main className="w-full overflow-y-auto">
      <div className="mx-auto my-16 max-w-screen-lg px-4">
        <div>
          <h2 className="mb-2 text-2xl font-bold">Welcome Back</h2>
          <p className="text-[#868686]">Speed up component creation & usage.</p>
        </div>

        <div className="mb-5 mt-9 flex items-center gap-3">
          <Input
            type="search"
            placeholder="Find templates..."
            className="h-[42px] flex-1 rounded-[5px] border border-[#404040] bg-[#26262635] text-[#737373]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SortDropdown templates={templates} setTemplates={setTemplates} />
        </div>

        <div className="grid grid-cols-3 gap-5">
          {filteredTemplates.map((template) => (
            <HomeCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default HomePage
