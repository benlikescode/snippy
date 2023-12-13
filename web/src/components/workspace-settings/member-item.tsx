import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type FC } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { type WorkspaceWithInfo } from '@/components/sidebar/sidebar'
import { Button } from '@/components/ui/button'
import { leaveWorkspace, removeMemberFromWorkspace } from '@/server/actions/workspace.actions'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

type Props = {
  workspace: WorkspaceWithInfo
  member: WorkspaceWithInfo['members'][number]
  closeModal: () => void
}

const MemberItem: FC<Props> = ({ workspace, member, closeModal }) => {
  const router = useRouter()
  const session = useSession()

  const handleRemoveMember = async () => {
    try {
      await removeMemberFromWorkspace(workspace.id, member.user.id)
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
    <div className="space-between flex items-center rounded-md p-2 hover:bg-[#181818]">
      <div className="flex w-full items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src={member.user.image ?? ''} />
        </Avatar>

        <div className="ml-3">
          <div>{member.user.name}</div>
          <div className="text-left text-sm text-[#5a626c]">{member.role.toLowerCase()}</div>
        </div>
      </div>

      {member.role !== 'OWNER' && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisHorizontalIcon className="h-5 w-5 shrink-0 text-[#737373]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onSelect={() =>
                session.data?.user.id === member.user.id ? handleLeave() : handleRemoveMember()
              }
              className="text-red-400"
            >
              {session.data?.user.id === member.user.id
                ? 'Leave Workspace'
                : `Remove ${member.user.name}`}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

export default MemberItem
