import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { type FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import { type WorkspaceWithInfo } from '@/components/sidebar/sidebar'
import { deleteWorkspace, leaveWorkspace } from '@/server/actions/workspace.actions'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'

const DELETE_COPY = {
  title: 'Delete workspace',
  confirmation: 'Are you sure you want to delete ',
  footerButton: 'Delete',
}

const LEAVE_COPY = {
  title: 'Leave workspace',
  confirmation: 'Are you sure you want to leave ',
  footerButton: 'Leave',
}

type Props = {
  workspace: WorkspaceWithInfo
  closeModal: () => void
}

const DestructiveButton: FC<Props> = ({ workspace, closeModal }) => {
  const [open, setOpen] = useState(false)
  const session = useSession()
  const router = useRouter()

  const IS_OWNER =
    session.data?.user.id === workspace.members.find((member) => member.role === 'OWNER')?.user.id
  const COPY = IS_OWNER ? DELETE_COPY : LEAVE_COPY
  const ACTION = IS_OWNER ? () => handleDeleteWorkspace() : () => handleLeave()

  const handleDeleteWorkspace = async () => {
    try {
      await deleteWorkspace(workspace.id)

      setOpen(false)
      router.refresh()
    } catch (err) {
      toast({ variant: 'destructive', description: (err as Error).message })
    }
  }

  const handleLeave = async () => {
    try {
      await leaveWorkspace(workspace.id)

      closeModal()
      router.refresh()
    } catch (err) {
      toast({ variant: 'destructive', description: (err as Error).message })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">{COPY.title}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{COPY.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {COPY.confirmation}
            <span className="font-semibold">{workspace.name}</span>? This action can not be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" type="submit" onClick={ACTION}>
            {COPY.footerButton}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DestructiveButton
