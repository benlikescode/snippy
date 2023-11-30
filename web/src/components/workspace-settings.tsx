import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import useGlobalStore from '@/stores/useGlobalStore'

const MEMBERS = [
  {
    name: 'Ben Hoeg',
    image: 'https://avatars.githubusercontent.com/u/63207900?v=4',
    role: 'owner',
  },
  {
    name: 'Jonathan Choi',
    image: 'https://avatars.githubusercontent.com/u/63207900?v=4',
    role: 'member',
  },
]

const WorkspaceSettings = () => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const { activeWorkspace } = useGlobalStore()

  const updateSettings = () => {
    console.log('updated settings')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="h-12 w-full rounded-[10px] border border-[#ffffff09] bg-[#1f1f1f] text-[18px] text-[#989898] hover:bg-[#252525]"
        >
          Workspace Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0" noCloseIcon>
        <DialogHeader className="border-b p-6">
          <DialogTitle>Workspace Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2 pb-4">
          <div className="space-y-2 px-6">
            <Label htmlFor="variable" className="text-[#737373]">
              Name
            </Label>
            <Input
              id="name"
              placeholder={activeWorkspace?.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-4 px-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#737373]">{`Members (${MEMBERS.length})`}</p>
              <Button variant="ghost" size="icon">
                <PlusIcon className="h-5 w-5 shrink-0 text-[#737373]" />
              </Button>
            </div>

            <div className="space-y-5">
              {MEMBERS.map((member) => (
                <div key={member.name} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={member.image ?? ''} />
                  </Avatar>

                  <div className="ml-3">
                    <div>{member.name}</div>
                    <div className="text-left text-sm text-[#5a626c]">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 px-6">
            <p className="text-sm text-[#737373]">Danger zone</p>
            <Button variant="destructive">Delete workspace</Button>
          </div>
        </div>

        <DialogFooter className="rounded-bl-lg rounded-br-lg bg-[#0d0d0d] px-6 py-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="modal" type="submit" onClick={() => updateSettings()}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default WorkspaceSettings
