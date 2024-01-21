'use client'

import React, { type FC, useState } from 'react'
import { type User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import { CaretSortIcon, ExitIcon } from '@radix-ui/react-icons'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props extends DropdownMenuContentProps {
  user: User
}

const AccountPopover: FC<Props> = ({ user, ...props }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.refresh()
    router.push('/login')
  }

  if (!user?.id) {
    return (
      <div className="border-t p-4">
        <Link
          href="/login"
          className="flex h-full items-center justify-center rounded bg-indigo-700 hover:bg-indigo-600"
        >
          Login
        </Link>
      </div>
    )
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div
          aria-expanded={open}
          aria-label="Account options"
          className="flex cursor-pointer select-none items-center p-3 md:justify-center md:hover:bg-[#151515] lg:p-4"
        >
          <Avatar className="h-6 w-6 md:h-11 md:w-11">
            <AvatarImage src={user.image ?? ''} />
          </Avatar>

          <div className="ml-3 hidden lg:block">
            <div>{user.name}</div>
            <div className="text-left text-sm text-[#5a626c]">{user.email}</div>
          </div>
          <CaretSortIcon className="ml-auto hidden h-6 w-6 shrink-0 opacity-50 lg:block" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0" align="start" alignOffset={16} {...props}>
        <div className="flex items-center border-b p-4">
          <Avatar>
            <AvatarImage src={user.image ?? ''} />
          </Avatar>

          <div className="ml-3">
            <div>{user.name}</div>
            <div className="text-left text-sm text-[#5a626c]">{user.email}</div>
          </div>
        </div>

        <div className="p-1">
          <div
            className="flex cursor-pointer select-none items-center rounded-sm p-2 text-sm text-red-400 hover:bg-[rgba(255,_255,_255,_0.08)]"
            onClick={handleSignOut}
          >
            <ExitIcon className="mr-3 h-4 w-4 shrink-0 text-red-400" />
            Logout
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountPopover
