import { type FileItemType } from '@/types'
import formatTimeAgo from '@/utils/formatTimeAgo'
import { type Template } from '@prisma/client'
import Link from 'next/link'
import { type FC } from 'react'

type Props = {
  template: Template
}

const HomeCard: FC<Props> = ({ template }) => {
  const getFirstFileContent = (files: FileItemType[]): string | null => {
    for (const item of files) {
      if (item.type === 'file' && item.data.content) {
        return item.data.content
      }

      if (item.type === 'folder') {
        const content = getFirstFileContent(item.data.files)

        if (content) {
          return content
        }
      }
    }

    return null
  }

  const getPreviewCode = () => {
    const files = template.files as FileItemType[]
    const content = getFirstFileContent(files)

    return content ?? ''
  }

  return (
    <div className="group grid gap-4">
      <Link
        href={`/snippy/${template.id}`}
        className="h-44 overflow-hidden rounded-[10px] border border-[#323232] bg-[#0D0D0D] pl-4 pt-4 group-hover:border-[#aaa]"
      >
        <div className="h-full w-full rounded-tl-md border-l border-t border-[#323232] bg-[#171717] p-4 font-mono text-xs font-semibold text-[#a3a3a3]">
          <pre>{getPreviewCode()}</pre>
        </div>
      </Link>

      <div className="grid gap-1">
        <p className="text-sm">{template.name}</p>
        <p className="text-xs text-[#737373]">Edited {formatTimeAgo(template.updatedAt)}</p>
      </div>
    </div>
  )
}

export default HomeCard
