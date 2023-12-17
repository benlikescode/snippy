'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type FC, useState } from 'react'
import { CaretSortIcon, ExitIcon } from '@radix-ui/react-icons'
import { signOut } from 'next-auth/react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type User } from 'next-auth'

type Props = {
  user: User
}

const AccountPopover: FC<Props> = ({ user }) => {
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
          className="flex cursor-pointer items-center border-t p-4 hover:bg-[#151515]"
        >
          <Avatar>
            <AvatarImage src={user.image ?? ''} />
          </Avatar>

          <div className="ml-3">
            <div>{user.name}</div>
            <div className="text-left text-sm text-[#5a626c]">{user.email}</div>
          </div>
          <CaretSortIcon className="ml-auto h-6 w-6 shrink-0 opacity-50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] p-0" align="start" alignOffset={16}>
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
