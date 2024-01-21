import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { TemplateIcon, SnippetIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/utils/cn'

type SnippyTypes = 'Template' | 'Snippets'

const TypeSelector = () => {
  const searchParams = useSearchParams()

  const [open, setOpen] = useState(!!searchParams.get('firstSnippy'))
  const [type, setType] = useState<SnippyTypes>('Template')

  const handleChangeType = (newType: 'Template' | 'Snippets') => {
    setType(newType)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="lg">
          {type === 'Template' ? (
            <TemplateIcon className="mr-2 h-6" />
          ) : (
            <SnippetIcon className="mr-2 h-6" />
          )}
          <span>{type}</span>
          <CaretSortIcon className="ml-3 h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="flex rounded-md p-0 shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]"
      >
        <DropdownMenuItem
          className={cn(
            'flex w-56 flex-col items-center rounded-br-none rounded-tr-none border-r p-6 text-[18px] focus:bg-inherit focus:text-inherit',
          )}
        >
          <div className="flex items-center">
            <TemplateIcon className="mr-2 h-[26px] text-[#585858]" />
            Template
          </div>

          <p className="mt-2 text-center text-sm text-[#676767]">
            Group commonly used files/folders
          </p>

          <Button
            variant={type === 'Template' ? 'default' : 'secondary'}
            size="lg"
            onClick={() => handleChangeType('Template')}
            className="mt-5 w-full"
          >
            Current
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(
            'flex w-56 flex-col items-center rounded-bl-none rounded-tl-none p-6 text-[18px] focus:bg-inherit focus:text-inherit',
          )}
        >
          <div className="flex items-center">
            <SnippetIcon className="mr-2 h-[26px] text-[#585858]" />
            Snippets
          </div>

          <p className="mt-2 text-center text-sm text-[#676767]">
            Group commonly used code snippets
          </p>

          <Button
            variant={type === 'Snippets' ? 'default' : 'secondary'}
            size="lg"
            onClick={() => handleChangeType('Snippets')}
            className="mt-5 w-full"
          >
            Switch
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TypeSelector
