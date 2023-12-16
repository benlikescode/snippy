'use client'

import { Button } from '@/components/ui/button'
import { useEffect, type FC, useState } from 'react'
import NameInput from './name-input'
import FileSystem from './file-system/file-system'
import useFileStore from '@/stores/useFileStore'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import useSnippyStore from '@/stores/useSnippyStore'
import CodeEditor from '@/app/snippy/_components/code-editor'
import { createTemplate, updateTemplate } from '@/server/actions/template.actions'
import { toast } from '@/components/ui/use-toast'
import { type FileItemType, type PromptType } from '@/types'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import Prompts from './prompts/prompts'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { type TemplateWithInfo } from '@/app/snippy/[id]/page'
import formatTimeAgo from '@/utils/formatTimeAgo'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { type User } from '@prisma/client'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

type Props = {
  snippy?: TemplateWithInfo
}

const Snippy: FC<Props> = ({ snippy }) => {
  const [conflictUser, setConflictUser] = useState<User>()
  const [conflictDialogOpen, setConflictDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const { files, pathToOpenFile, openFile, setFiles, setOpenFile, setPathToOpenFile } =
    useFileStore()
  const { prompts, snippyName, setPrompts, setSnippyName } = useSnippyStore()
  const router = useRouter()

  useEffect(() => {
    setDefaultState()

    return () => {
      setOpenFile(null)
      setPathToOpenFile([])
    }
  }, [snippy])

  const setDefaultState = () => {
    setSnippyName(snippy?.name ?? '')
    setPrompts((snippy?.prompts as PromptType[]) ?? [])
    setFiles(snippy?.files ? [...(snippy?.files as FileItemType[])] : [])
  }

  const handleSaveChanges = async (forceSave = false) => {
    if (!snippy) return

    try {
      setIsSaving(true)

      const res = await updateTemplate(
        snippy.id,
        snippyName,
        prompts,
        files,
        snippy.updatedAt,
        forceSave,
      )

      if (res.hasEditConflict) {
        setConflictDialogOpen(true)
        setConflictUser(res.lastUpdatedBy)
      }

      if (res.message) {
        toast({ description: res.message })
        router.refresh()
      }
    } catch (err) {
      toast({ variant: 'destructive', description: (err as Error).message })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCreateSnippy = async () => {
    try {
      const res = await createTemplate(snippyName, prompts, files)

      toast({ description: res.message })
      router.replace(`/snippy/${res.id}`)
    } catch (err) {
      toast({ variant: 'destructive', description: (err as Error).message })
    }
  }

  const handleForceSave = async () => {
    await handleSaveChanges(true)

    setConflictDialogOpen(false)
    setConflictUser(undefined)
  }

  return (
    <>
      <div className="flex h-full w-full flex-col ">
        <div className="flex h-[70px] w-full shrink-0 items-center justify-between border-b px-5">
          <div className="flex items-center space-x-3">
            <Link href="/" className="h-8 w-8">
              <Button variant="ghost" className="h-full w-full">
                <ChevronLeftIcon className="h-7 w-7 shrink-0 text-[#484848]" />
              </Button>
            </Link>

            <NameInput />
          </div>

          <div className="flex items-center gap-5">
            {snippy?.updatedAt && snippy?.updatedBy && (
              <Tooltip delayDuration={150}>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2">
                    {snippy.updatedBy.image && (
                      <Avatar className="h-[18px] w-[18px]">
                        <AvatarImage src={snippy.updatedBy.image ?? ''} />
                      </Avatar>
                    )}

                    <p className="relative top-[1px] text-[13px] font-medium text-[#737373]">
                      Edited {formatTimeAgo(snippy.updatedAt)}
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent align="start" sideOffset={8} className="space-y-1 text-[#737373]">
                  <p>
                    Edited by{' '}
                    <span className="font-medium text-[#a5a5a5]">{snippy.updatedBy.name}</span>{' '}
                    {formatTimeAgo(snippy.updatedAt)}
                  </p>
                  <p>
                    Created by{' '}
                    <span className="font-medium text-[#a5a5a5]">{snippy.creator.name}</span>{' '}
                    {formatTimeAgo(snippy.createdAt)}
                  </p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* <TypeSelector /> */}

            <Button
              size="lg"
              onClick={() => (snippy ? handleSaveChanges() : handleCreateSnippy())}
              showSpinner={isSaving}
              className="px-5"
            >
              <span>{snippy ? 'Save Changes' : 'Create Snippy'}</span>
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(100%_-_70px)]">
          <div className="flex w-[460px] shrink-0 flex-col border-r bg-[#070707]">
            <Prompts />
            <FileSystem
              noFiles={snippy?.files ? !(snippy?.files as FileItemType[]).length : true}
            />
          </div>

          {openFile?.data.name && !!pathToOpenFile.length ? (
            <div className="h-full w-full">
              <div className="grid h-full">
                <div className="flex h-12 items-center bg-[#0c0c0c] px-4 text-sm font-medium text-[#bababa]">
                  {pathToOpenFile.map((str, idx) => (
                    <div key={idx} className="flex items-center">
                      {idx !== 0 && (
                        <ChevronRightIcon className="h-4 stroke-[2px] text-[#767676]" />
                      )}
                      {str}
                    </div>
                  ))}
                </div>

                <CodeEditor />
              </div>
            </div>
          ) : (
            <div className="flex w-full select-none flex-col items-center justify-center space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#222] bg-[#181818] shadow-lg">
                <MagnifyingGlassIcon className="h-8 w-8 text-[#737373]" />
              </div>
              <p className=" text-[#737373]">Open a file to preview it here</p>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={conflictDialogOpen} onOpenChange={setConflictDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conflict Detected</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-medium text-[#bcbcbc]">
                {conflictUser?.name ?? 'Another member'}
              </span>{' '}
              has made changes to this template while you were working. Are you sure you want to
              overwrite their changes?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setConflictDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleForceSave()}>Overwrite</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Snippy
