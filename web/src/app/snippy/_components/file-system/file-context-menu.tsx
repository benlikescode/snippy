import { type FC, type ReactNode, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
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
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {item.type === 'file' ? 'File' : 'Folder'}</DialogTitle>
          <DialogDescription>Are you sure you want to delete {item.data.name}</DialogDescription>
        </DialogHeader>
        <div></div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => handleDelete()}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FileContextMenu
