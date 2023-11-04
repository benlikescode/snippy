'use client'

import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import type { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
} & LinkProps

const SidebarItem: FC<Props> = ({ children, href, ...rest }) => {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      draggable={false}
      {...rest}
      className="flex h-10 select-none items-center rounded-md px-3 font-medium text-stone-400 "
    >
      {children}
    </Link>
  )
}

export default SidebarItem
