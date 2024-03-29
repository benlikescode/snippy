'use client'

import { type FC, useState, useEffect } from 'react'
import { type Template } from '@prisma/client'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const SORT_OPTIONS = [
  {
    label: 'Last edited',
    orderBy: ['Newest first', 'Oldest first'],
  },
  {
    label: 'Date created',
    orderBy: ['Newest first', 'Oldest first'],
  },
  {
    label: 'Alphabetical',
    orderBy: ['A-Z', 'Z-A'],
  },
] as const

type SortOptionsType = (typeof SORT_OPTIONS)[number]
type OrderByType = (typeof SORT_OPTIONS)[number]['orderBy'][number]

type Props = {
  templates: Template[]
  setTemplates: (templates: Template[]) => void
}

const SortDropdown: FC<Props> = ({ templates, setTemplates }) => {
  const [sortBy, setSortBy] = useState<SortOptionsType>(SORT_OPTIONS[0])
  const [orderBy, setOrderBy] = useState<OrderByType>(SORT_OPTIONS[0].orderBy[0])

  useEffect(() => {
    sortTemplates()
  }, [sortBy, orderBy])

  const sortTemplates = () => {
    if (sortBy.label === 'Alphabetical') {
      return setTemplates(
        [...templates].sort((a, b) =>
          orderBy === 'A-Z' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
        ),
      )
    }

    if (sortBy.label === 'Date created') {
      return setTemplates(
        [...templates].sort((a, b) =>
          orderBy === 'Newest first'
            ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ),
      )
    }

    if (sortBy.label === 'Last edited') {
      return setTemplates(
        [...templates].sort((a, b) =>
          orderBy === 'Newest first'
            ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            : new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
        ),
      )
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="h-[42px] w-[180px] justify-between rounded-[5px] border bg-transparent text-[#737373] hover:bg-[#151515]"
        >
          <span>{sortBy.label}</span>
          <CaretSortIcon className="ml-2 h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuGroup title="Sort by">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.label}
              checked={option.label === sortBy.label}
              onCheckedChange={() => {
                setSortBy(option)
                setOrderBy(option.orderBy[0])
              }}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup title="Order by">
          <DropdownMenuLabel>Order by</DropdownMenuLabel>
          {sortBy.orderBy.map((option) => (
            <DropdownMenuCheckboxItem
              key={option}
              checked={option === orderBy}
              onCheckedChange={() => setOrderBy(option)}
            >
              {option}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortDropdown
