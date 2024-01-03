import { type FileItemType } from '@/types'
import formatTimeAgo from '@/utils/formatTimeAgo'
import { type Template } from '@prisma/client'
import Link from 'next/link'
import { type FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@heroicons/react/24/solid'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deleteTemplate } from '@/server/actions/template.actions'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

type Props = {
  template: Template
}

const HomeCard: FC<Props> = ({ template }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const router = useRouter()

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

  const handleDeleteTemplate = async () => {
    try {
      await deleteTemplate({ templateId: template.id })

      router.refresh()
    } catch (err) {
      toast({ variant: 'destructive', description: (err as Error).message })
    }
  }

  return (
    <div className="group grid gap-4">
      <div className="relative h-44 w-full overflow-hidden rounded-[10px] border border-[#323232] bg-[#0D0D0D] focus-within:shadow-[0_0_0_1px_#aaa] group-hover:border-[#aaa]">
        <Link href={`/snippy/${template.id}`}>
          <div className="h-full pl-4 pt-4">
            <div className="h-full rounded-br-[10px] rounded-tl-md border-l border-t border-[#323232] bg-[#171717] p-4 font-mono text-xs font-semibold text-[#a3a3a3]">
              <pre>{getPreviewCode()}</pre>
            </div>
          </div>
        </Link>

        <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <AlertDialogTrigger asChild>
            <div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-50 bg-[#252525] opacity-0 hover:bg-[#252525] focus:opacity-100 group-hover:opacity-100"
              >
                <TrashIcon className="h-5 text-[#d57070]" />
              </Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Template</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete
                <span className="font-semibold"> {template.name}</span>? This action can not be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteTemplate()}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid gap-1">
        <p className="text-sm">{template.name}</p>
        <p className="text-xs text-[#737373]">Edited {formatTimeAgo(template.updatedAt, 'long')}</p>
      </div>
    </div>
  )
}

export default HomeCard
