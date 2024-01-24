import { type FC, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TrashIcon } from '@heroicons/react/24/solid'
import { type Template } from '@prisma/client'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { deleteTemplate } from '@/server/actions/template.actions'
import { type FileItemType } from '@/types'
import formatTimeAgo from '@/utils/formatTimeAgo'

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
      <div className="relative h-44 w-full overflow-hidden rounded-[10px] border border-[#1f1f1f] bg-[#0D0D0D] focus-within:shadow-[0_0_0_1px_#737373] group-hover:border-[#262626]">
        <Link href={`/snippy/${template.id}`}>
          <div className="h-full pl-3 pt-3">
            <div className="h-full rounded-tl-[10px] bg-[#171717] border-t border-l border-[#1f1f1f] p-4 font-mono text-xs font-semibold text-[#737373]">
              <pre>{getPreviewCode()}</pre>
            </div>
          </div>
        </Link>

        <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <AlertDialogTrigger asChild>
            <div>
              <Button
                size="icon"
                className="absolute right-2 top-2 z-50 bg-[#252525] hover:bg-[#282828] shadow-md opacity-0 focus:opacity-100 group-hover:opacity-100"
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

      <div>
        <p className="truncate text-sm text-[#dcdcdc]">{template.name}</p>
        <p className="text-xs mt-[4px] font-semibold text-[#555555]">Edited {formatTimeAgo(template.updatedAt, 'long')}</p>
      </div>
    </div>
  )
}

export default HomeCard
