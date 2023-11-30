import * as React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { cn } from '@/utils/cn'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Searchbar = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        'flex h-[42px] flex-1 items-center rounded-[5px] border border-[#323232] bg-[#151515] pl-3 text-[#737373] focus-within:ring-1 focus-within:ring-ring',
        className,
      )}
    >
      <MagnifyingGlassIcon className="h-6 w-6" />

      <input
        {...props}
        type="search"
        ref={ref}
        className="w-full rounded-[5px] bg-inherit p-2 placeholder:text-[#737373] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  )
})

Searchbar.displayName = 'Search'

export { Searchbar }
