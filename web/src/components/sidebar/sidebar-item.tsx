'use client'

import { cn } from '@/utils/cn'
import Link, { type LinkProps } from 'next/link'
import type { FC, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import useSnippyStore from '@/stores/useSnippyStore'

type Props = {
  children: ReactNode
} & LinkProps

const SidebarItem: FC<Props> = ({ children, href, ...rest }) => {
  const pathname = usePathname()

  const { sidebarCollapsed } = useSnippyStore()

  return (
    <Link
      href={href}
      draggable={false}
      {...rest}
      className={cn(
        'flex h-10 select-none items-center rounded-md px-3 font-medium text-[#7B8188]',
        pathname === href && 'text-[#fff]',
        sidebarCollapsed && 'justify-center p-0',
      )}
    >
      {children}
    </Link>
  )
}

export default SidebarItem
