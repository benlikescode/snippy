'use client'

import { CaretSortIcon, CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'

import { cn } from '@/utils/cn'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type ComponentPropsWithoutRef, type FC, useState } from 'react'
import pluralize from '@/utils/pluralize'
import useSnippyStore from '@/stores/useSnippyStore'
import { createWorkspace, type WorkspaceWithInfo } from '@/server/actions/workspace.actions'
import { toast } from '@/components/ui/use-toast'

type Props = ComponentPropsWithoutRef<typeof DropdownMenuTrigger> & {
  workspaces: WorkspaceWithInfo[]
}

const WorkspaceSwitcher: FC<Props> = ({ workspaces }) => {
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState('')
  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceWithInfo>(workspaces[0]!)
  const { sidebarCollapsed } = useSnippyStore()

  console.log(workspaces)

  const getAcronym = (str: string) => {
    if (!str) return ''

    return str
      .split(' ')
      .map((x) => x.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  const createNewWorkspace = async () => {
    const res = await createWorkspace(newWorkspaceName)

    if (res.error) {
      return toast({ description: res.error.message })
    }

    setDialogOpen(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div
            aria-expanded={true}
            aria-label="Select a team"
            className={cn(
              'flex cursor-pointer items-center border-b p-4 hover:bg-stone-900',
              sidebarCollapsed && 'justify-center p-3',
            )}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#2c3036] font-semibold">
              {getAcronym(selectedWorkspace.name)}
            </div>

            <div className={cn('ml-3', sidebarCollapsed && 'hidden')}>
              <div>{selectedWorkspace.name}</div>
              <div className="text-left text-sm text-[#5a626c]">
                {pluralize('member', selectedWorkspace._count.user)}
              </div>
            </div>

            <CaretSortIcon
              className={cn('ml-auto h-6 w-6 shrink-0 opacity-50', sidebarCollapsed && 'hidden')}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0" align="start" alignOffset={sidebarCollapsed ? 12 : 16}>
          <Command>
            <CommandList>
              <CommandInput placeholder="Find workspace..." />
              <CommandEmpty>No workspace found.</CommandEmpty>

              <CommandGroup heading="Personal">
                {workspaces.map((workspace) => (
                  <CommandItem
                    key={workspace.id}
                    onSelect={() => {
                      setSelectedWorkspace(workspace)
                      setOpen(false)
                    }}
                    className="mb-1 last:mb-0"
                  >
                    <Avatar className="mr-2 h-6 w-6">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${workspace.id}.png`}
                        alt={workspace.name ?? ''}
                        className="grayscale"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>

                    {workspace.name}

                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        selectedWorkspace.id === workspace.id ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setDialogOpen(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Workspace
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Organize your templates and collaborate with others.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workspace name</Label>
              <Input
                id="name"
                placeholder="Acme Inc."
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={createNewWorkspace}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default WorkspaceSwitcher
