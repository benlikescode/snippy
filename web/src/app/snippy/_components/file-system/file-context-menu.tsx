import { type FC, type ReactNode, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

import { type FileItemType } from '@/types'
import useFileStore from '@/stores/useFileStore'

type Props = {
  children: ReactNode
  item: FileItemType
  setIsFolderOpen?: (isFolderOpen: boolean) => void
  setIsActive?: (isActive: boolean) => void
  setIsEditing?: (isEditing: boolean) => void
}

const FileContextMenu: FC<Props> = ({ children, item, setIsFolderOpen, setIsEditing }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { createNewFile, createNewFolder, deleteItem } = useFileStore()

  const handleAddFile = () => {
    setIsFolderOpen && setIsFolderOpen(true)

    createNewFile(item.id)
  }

  const handleAddFolder = () => {
    setIsFolderOpen && setIsFolderOpen(true)

    createNewFolder(item.id)
  }

  const handleRename = () => {
    setIsEditing && setIsEditing(true)
  }

  const handleDelete = () => {
    setDialogOpen(false)

    deleteItem(item.id)
  }

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="h-full" onContextMenu={(e) => e.preventDefault()}>
        <ContextMenu>
          <ContextMenuTrigger>{children}</ContextMenuTrigger>

          <ContextMenuContent>
            {item.type === 'folder' && (
              <>
                <ContextMenuItem onClick={handleAddFile}>New File</ContextMenuItem>
                <ContextMenuItem onClick={handleAddFolder}>New Folder</ContextMenuItem>
              </>
            )}

            {item.id && (
              <>
                <ContextMenuItem onClick={handleRename}>Rename</ContextMenuItem>
                <ContextMenuItem onClick={() => setDialogOpen(true)} className="text-red-400">
                  Delete
                </ContextMenuItem>
              </>
            )}
          </ContextMenuContent>
        </ContextMenu>
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {item.type === 'file' ? 'File' : 'Folder'}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <span className="font-semibold">{item.data.name}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div></div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" type="submit" onClick={() => handleDelete()}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default FileContextMenu
