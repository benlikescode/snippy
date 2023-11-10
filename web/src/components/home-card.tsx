import Link from 'next/link'
import { FC } from 'react'

type Props = {
  id: string
  name: string
  content: string
  type: 'snippet' | 'template'
}

const HomeCard: FC<Props> = ({ id, name, content, type }) => {
  return (
    <Link href={`/snippy/${id}`} className="grid gap-4">
      <div className="h-44 overflow-hidden rounded-md border border-border bg-black pl-4 pt-4">
        <div className="h-full w-full rounded-tl-md border border-border bg-background p-4 text-xs text-[#a3a3a3]">
          {content}
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <p className="">{name}</p>
          <div className="text-bold flex h-6 items-center justify-center rounded-full bg-[#262626] p-2 text-xs uppercase tracking-wide">
            <span>{type}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HomeCard
