import PromptItemPopover from '@/app/snippy/_components/prompts/prompt-item-popover'
import { type PromptType } from '@/types'
import { type FC } from 'react'

type Props = {
  prompt: PromptType
}

const PromptItem: FC<Props> = ({ prompt }) => {
  return (
    <div className="flex h-12 items-center justify-between rounded-lg bg-[#1d1d1d] px-3 text-[15px] font-medium text-[#535656]">
      <div className="flex min-w-0 items-center">
        $<span className="ml-2.5 mr-4 text-white">{prompt.variable}</span>
        <span className="block truncate">{prompt.prompt}</span>
      </div>
      <PromptItemPopover promptItem={prompt} />
    </div>
  )
}

export default PromptItem
