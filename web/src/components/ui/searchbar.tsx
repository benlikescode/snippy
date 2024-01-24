import * as React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Spinner from '@/components/spinner'
import { cn } from '@/utils/cn'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isSearching?: boolean
}

const Searchbar = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, isSearching, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-[42px] flex-1 items-center rounded-[5px] border bg-transparent pl-3 text-[#737373] focus-within:ring-1 focus-within:ring-ring',
          className,
        )}
      >
        {isSearching ? (
          <Spinner className="h-5 w-5 fill-[#737373]" />
        ) : (
          <MagnifyingGlassIcon className="h-5 w-5 text-[#737373]" />
        )}

        <input
          type="search"
          ref={ref}
          className="w-full rounded-[5px] bg-inherit p-2 text-[16px] text-[#dcdcdc] placeholder:text-[#737373] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        />
      </div>
    )
  },
)

Searchbar.displayName = 'Search'

export { Searchbar }
