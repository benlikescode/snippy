import { type PromptType } from '@/types'
import { type FC } from 'react'

type Props = {
  prompt: PromptType
}

const PromptItem: FC<Props> = ({ prompt }) => {
  return (
    <div className="rounded-md bg-[#1d1d1d] p-3">
      <div className="flex items-center text-[15px] text-[#535656]">
        $<span className="ml-2.5 mr-4 text-white">{prompt.variable}</span>
        <span>{prompt.prompt}</span>
      </div>
    </div>
  )
}

export default PromptItem
