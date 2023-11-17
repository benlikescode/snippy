'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'
import {
  CaretSortIcon,
  ChatBubbleIcon,
  ExitIcon,
  MoonIcon,
  PersonIcon,
  SunIcon,
} from '@radix-ui/react-icons'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import useSnippyStore from '@/stores/useSnippyStore'
import { cn } from '@/utils/cn'

const AccountPopover = () => {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const { sidebarCollapsed } = useSnippyStore()

  if (!session || !session.user) {
    return null
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div
          aria-expanded={open}
          aria-label="Account options"
          className={cn(
            'flex cursor-pointer items-center border-t p-4 hover:bg-stone-900',
            sidebarCollapsed && 'justify-center p-3',
          )}
        >
          <Avatar>
            <AvatarImage src={session.user.image ?? ''} />
          </Avatar>

          <div className={cn('ml-3', sidebarCollapsed && 'hidden')}>
            <div>{session.user.name}</div>
            <div className="text-left text-sm text-[#5a626c]">{session.user.email}</div>
          </div>
          <CaretSortIcon
            className={cn('ml-auto h-6 w-6 shrink-0 opacity-50', sidebarCollapsed && 'hidden')}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[250px] p-0"
        align="start"
        alignOffset={sidebarCollapsed ? 12 : 16}
      >
        <div className="flex items-center  p-4">
          <Avatar>
            <AvatarImage src={session.user.image ?? ''} />
          </Avatar>

          <div className="ml-3">
            <div>{session.user.name}</div>
            <div className="text-left text-sm text-[#5a626c]">{session.user.email}</div>
          </div>
        </div>

        <DropdownMenuSeparator />

        <div className="flex cursor-pointer items-center justify-between px-4 py-2 text-[#B0B0B0] hover:bg-[#222]">
          <div className="flex items-center">
            <MoonIcon className="mr-3 h-4 w-4 shrink-0 text-[#737373]" />
            Dark Mode
          </div>

          <Switch />
        </div>

        <div className="flex cursor-pointer items-center px-4 py-2 text-[#B0B0B0] hover:bg-[#222]">
          <PersonIcon className="mr-3 h-4 w-4 shrink-0 text-[#737373]" />
          Account
        </div>

        <div className="flex cursor-pointer items-center px-4 py-2 text-[#B0B0B0] hover:bg-[#222]">
          <ChatBubbleIcon className="mr-3 h-4 w-4 shrink-0 text-[#737373]" />
          Support
        </div>

        <DropdownMenuSeparator />

        <div className="flex cursor-pointer items-center px-4 py-2 text-[#B0B0B0] hover:bg-[#222]">
          <ExitIcon className="mr-3 h-4 w-4 shrink-0 text-[#737373]" />
          Logout
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountPopover
