import { type FileItemType } from '@/types'
import { type Template } from '@prisma/client'
import Link from 'next/link'
import { Fragment, type FC } from 'react'

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
    <Link href={`/snippy/${template.id}`} className="grid gap-4">
      <div className="h-44 overflow-hidden rounded-md border bg-black pl-4 pt-4">
        <div className="h-full w-full whitespace-pre-line rounded-tl-md border-l border-t bg-background p-4 text-xs font-semibold text-[#a3a3a3]">
          {getPreviewCode()
            .split('\n')
            .map((line, idx) => (
              <Fragment key={idx}>
                {line}
                <br />
              </Fragment>
            ))}
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <p className="">{template.name}</p>
          <div className="flex h-6 items-center justify-center rounded-full bg-[#262626] p-2 text-xs font-bold uppercase tracking-wide">
            <span>Template</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HomeCard
