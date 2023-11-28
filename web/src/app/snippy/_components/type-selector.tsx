import promptItem from '@/app/snippy/_components/prompts/prompt-item'
import { Button } from '@/components/ui/button'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { TemplateIcon, SnippetIcon } from '@/components/icons'
import { cn } from '@/utils/cn'

type SnippyTypes = 'Template' | 'Snippets'

const TypeSelector = () => {
  const [type, setType] = useState<SnippyTypes>('Template')

  const handleChangeType = (newType: 'Template' | 'Snippets') => {
    setType(newType)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="lg">
          {type === 'Template' ? (
            <TemplateIcon className="mr-3 h-6" />
          ) : (
            <SnippetIcon className="mr-3 h-6" />
          )}
          <span>{type}</span>
          <CaretSortIcon className="ml-3 h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex rounded-md bg-[#181818] shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]">
          <DropdownMenuItem
            onClick={() => handleChangeType('Template')}
            className={cn(
              'flex w-56 cursor-pointer flex-col items-center p-8 text-[18px] ',
              type === 'Template' && 'bg-[#222222]',
            )}
          >
            <div className="flex items-center">
              <TemplateIcon className="mr-2 h-[26px] text-[#585858]" />
              Template
            </div>

            <p className="mt-3 text-center text-sm text-[#676767]">
              Group commonly used files/folders
            </p>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleChangeType('Snippets')}
            className={cn(
              'flex w-56 cursor-pointer flex-col items-center p-8 text-[18px] ',
              type === 'Snippets' && 'bg-[#222222]',
            )}
          >
            <div className="flex items-center">
              <SnippetIcon className="mr-2 h-[26px] text-[#585858]" />
              Snippets
            </div>

            <p className="mt-3 text-center text-sm text-[#676767]">
              Group commonly used code snippets
            </p>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TypeSelector
