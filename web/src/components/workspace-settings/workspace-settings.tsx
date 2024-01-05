'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, type FC, type KeyboardEvent, useMemo } from 'react'
import { toast } from '@/components/ui/use-toast'
import { addMembersToWorkspace, updateWorkspace } from '@/server/actions/workspace.actions'
import { useRouter } from 'next/navigation'
import { CogIcon } from '@/components/icons'
import { type WorkspaceWithInfo } from '@/components/sidebar/sidebar'
import { XMarkIcon } from '@heroicons/react/24/solid'
import MemberItem from '@/components/workspace-settings/member-item'
import DestructiveButton from '@/components/workspace-settings/destructive-button'
import SidebarItem from '@/components/sidebar/sidebar-item'
import { MAX_MEMBERS_PER_WORKSPACE } from '@/validations/workspace.validations'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const EMAIL_REGEX = /\S+@\S+\.\S+/

type Props = {
  workspace: WorkspaceWithInfo
}

const WorkspaceSettings: FC<Props> = ({ workspace }) => {
  const [open, setOpen] = useState(false)
  const [workspaceName, setWorkspaceName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  const router = useRouter()

  const handleUpdateWorkspace = async () => {
    if (!workspaceName) {
      return toast({ variant: 'destructive', description: 'Workspace name can not be empty' })
    }

    try {
      await updateWorkspace({ workspaceId: workspace.id, name: workspaceName })

      setOpen(false)
      router.refresh()
    } catch (err) {
      toast({ variant: 'destructive', description: (err as Error).message })
    }
  }

  const handleInvite = async () => {
    addEmailToList()

    try {
      await addMembersToWorkspace({ workspaceId: workspace.id, emails: emailsToInvite })

      setInviteEmail('')
      setEmailsToInvite([])

      router.refresh()
    } catch (err) {
      toast({ variant: 'destructive', description: (err as Error).message })
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return
    }

    addEmailToList()
  }

  const addEmailToList = () => {
    if (!inviteEmail || emailsToInvite.includes(inviteEmail)) {
      return
    }

    setInviteEmail('')
    setEmailsToInvite((prev) => [...prev, inviteEmail])
  }

  const handleRemoveEmailToInvite = (emailToRemove: string) => {
    setEmailsToInvite(emailsToInvite.filter((email) => email !== emailToRemove))
  }

  const sortMembers = (members: WorkspaceWithInfo['members']) => {
    type Member = WorkspaceWithInfo['members'][number]

    const sortComparator = (member1: Member, member2: Member) => {
      if (member1.role === 'OWNER' && member2.role !== 'OWNER') {
        return -1
      }

      if (member1.role !== 'OWNER' && member2.role === 'OWNER') {
        return 1
      }

      return 0
    }

    return members.sort(sortComparator)
  }

  const isInviteButtonDisabled = useMemo(() => {
    let isInviteBtnDisabled = !EMAIL_REGEX.test(inviteEmail)

    if (!!emailsToInvite.length && !inviteEmail) {
      isInviteBtnDisabled = false
    }

    if (workspace.members.some((member) => member.user.email === inviteEmail)) {
      isInviteBtnDisabled = true

      toast({
        variant: 'destructive',
        description: `${inviteEmail} is already a member of the workspace`,
      })
    }

    return isInviteBtnDisabled
  }, [inviteEmail, emailsToInvite, workspace.members])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarItem>
          <CogIcon className="mr-3 h-6" />
          <span className="hidden md:block">Workspace Settings</span>
        </SidebarItem>
      </DialogTrigger>
      <DialogContent className="gap-0 p-0" noCloseIcon>
        <DialogHeader className="p-6">
          <DialogTitle>Workspace Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general">
          <div className="border-b border-[#181818]">
            <TabsList className="">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="members">Members ({workspace.members.length})</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="general">
            <div className="mt-8 space-y-8 px-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#737373]">
                  Name
                </Label>
                <Input
                  id="workspace-name"
                  defaultValue={workspace.name}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm text-[#737373]">Danger zone</p>

                <DestructiveButton workspace={workspace} closeModal={() => setOpen(false)} />
              </div>
            </div>

            <DialogFooter className="mt-10 rounded-bl-lg rounded-br-lg bg-[#0c0c0c] px-6 py-5">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="modal" onClick={() => handleUpdateWorkspace()}>
                Update
              </Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="members">
            {workspace.members.length >= MAX_MEMBERS_PER_WORKSPACE ? (
              <div className="flex items-center px-6 py-8">
                <ExclamationTriangleIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Workspace member limit reached.
                </span>
              </div>
            ) : (
              <div className="mb-6 border-b border-[#181818] p-6">
                <Input
                  id="invite"
                  placeholder="Invite by email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                {!!emailsToInvite.length && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {emailsToInvite.map((email) => (
                      <div
                        key={email}
                        className="flex w-fit items-center justify-center rounded-md bg-[#1f1f1f] px-2 py-1 text-sm text-[#a5a5a5]"
                      >
                        {email}
                        <button onClick={() => handleRemoveEmailToInvite(email)}>
                          <XMarkIcon className="ml-1 h-4 w-4 shrink-0 text-[#737373]" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-1 overflow-y-auto px-4">
              {sortMembers(workspace.members).map((member) => (
                <MemberItem
                  key={member.user.id}
                  workspace={workspace}
                  member={member}
                  closeModal={() => setOpen(false)}
                />
              ))}
            </div>

            <DialogFooter className="mt-10 rounded-bl-lg rounded-br-lg  bg-[#0c0c0c] px-6 py-5">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="modal"
                onClick={() => handleInvite()}
                disabled={isInviteButtonDisabled}
              >
                Invite
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default WorkspaceSettings
