'use client'

import type { FC, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

type Props = {
  children: ReactNode
  href?: string
}

const SidebarItem: FC<Props> = ({ children, href, ...rest }) => {
  const pathname = usePathname()

  if (!href) {
    return (
      <Button
        className="flex h-10 select-none items-center justify-start rounded-md bg-transparent px-3 font-medium text-[#7B8188] hover:bg-transparent"
        {...rest}
      >
        {children}
      </Button>
    )
  }

  return (
    <Link
      href={href}
      draggable={false}
      {...rest}
      className={cn(
        'flex h-10 select-none items-center rounded-md px-3 font-medium text-[#7B8188]',
        pathname === href && 'text-[#fff]',
      )}
    >
      {children}
    </Link>
  )
}

export default SidebarItem
