'use client'

import HomeCard from '@/components/home-card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { cn } from '@/utils/cn'
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

const CARDS = [
  {
    id: '1',
    name: 'React Component',
    content: `import classNames from 'classNames'`,
  },
  {
    id: '2',
    name: 'Button',
    content: `import classNames from 'classNames'`,
  },
  {
    id: '3',
    name: 'NextJS Component',
    content: `import classNames from 'classNames'`,
  },
  {
    id: '4',
    name: 'React Component',
    content: `import classNames from 'classNames'`,
  },
  {
    id: '5',
    name: 'Button',
    content: `import classNames from 'classNames'`,
  },
  {
    id: '6',
    name: 'NextJS Component',
    content: `import classNames from 'classNames'`,
  },
] as any[]

export default function HomePage() {
  const [state, setState] = useState('asc')

  return (
    <main className="mx-auto my-16 w-full max-w-screen-lg px-4">
      <div>
        <h2 className="mb-2 text-2xl font-bold">Welcome Back</h2>
        <p className="text-[#868686]">Speed up component creation & usage.</p>
      </div>

      <div className="mb-5 mt-9 flex items-center gap-3">
        <Input
          type="search"
          placeholder="Find templates..."
          className="md:w-[100px] lg:w-[600px]"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 data-[state=open]:bg-accent">
              <span>Recently Created</span>
              {state === 'desc' ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : state === 'asc' ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <CaretSortIcon className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setState('asc')}>
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setState('desc')}>
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setState('hide')}>
              <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {CARDS.map((card) => (
          <HomeCard
            key={card.id}
            id={card.id}
            name={card.name}
            content={card.content}
            type="snippet"
          />
        ))}
      </div>
    </main>
  )
}
