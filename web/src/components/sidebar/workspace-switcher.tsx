'use client'

import { cn } from '@/utils/cn'
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
import { type ComponentPropsWithoutRef, type FC, useState, type FormEvent, useEffect } from 'react'
import pluralize from '@/utils/pluralize'
import { changeWorkspace, createWorkspace } from '@/server/actions/workspace.actions'
import { toast } from '@/components/ui/use-toast'
import { type WorkspaceWithInfo } from '@/components/sidebar/sidebar'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { PlusIcon } from '@heroicons/react/24/outline'

type Props = ComponentPropsWithoutRef<typeof DropdownMenuTrigger> & {
  activeWorkspace: WorkspaceWithInfo
  initialWorkspaces: WorkspaceWithInfo[]
}

const WorkspaceSwitcher: FC<Props> = ({ activeWorkspace, initialWorkspaces }) => {
  const [workspace, setWorkspace] = useState(activeWorkspace)
  const [workspaces, setWorkspaces] = useState(initialWorkspaces)
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState('')

  useEffect(() => {
    setWorkspace(activeWorkspace)
    setWorkspaces(initialWorkspaces)
  }, [activeWorkspace, initialWorkspaces])

  const getAcronym = (str: string) => {
    if (!str) return ''

    return str
      .split(' ')
      .map((x) => x.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2)
  }

  const createNewWorkspace = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await createWorkspace(newWorkspaceName)

      setDialogOpen(false)
    } catch (err) {
      toast({ variant: 'destructive', description: (err as Error).message })
    }
  }

  const handleChangeWorkspace = async (newWorkspace: WorkspaceWithInfo) => {
    try {
      setWorkspace(newWorkspace)

      await changeWorkspace(newWorkspace.id)

      setOpen(false)
    } catch (err) {
      toast({ variant: 'destructive', description: (err as Error).message })
    }
  }

  if (!workspace) {
    return <div></div>
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div
            aria-expanded={true}
            aria-label="Select a workspace"
            className="flex cursor-pointer items-center justify-between border-b p-4 hover:bg-stone-900"
          >
            <div className="flex items-center">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#2c3036] font-semibold">
                {getAcronym(workspace.name)}
              </div>

              <div className="ml-3 grid">
                <div className="truncate">{workspace.name}</div>

                <div className="text-sm text-[#5a626c]">
                  {pluralize('member', workspace._count.members)}
                </div>
              </div>
            </div>

            <ChevronUpDownIcon className="ml-2 h-6 w-6 shrink-0 opacity-50" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px] p-0" align="start" alignOffset={16}>
          <Command>
            <CommandList>
              <CommandInput placeholder="Find workspace..." />
              <CommandEmpty>No workspace found.</CommandEmpty>

              <CommandGroup heading="Personal" className="space-y-1">
                <div className="space-y-1">
                  {workspaces.map((currWorkspace) => (
                    <CommandItem
                      key={currWorkspace.id}
                      onSelect={() => handleChangeWorkspace(currWorkspace)}
                      className="flex items-center justify-between"
                    >
                      <div className="flex min-w-0 items-center">
                        <div className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#2c3036] font-semibold">
                          {getAcronym(currWorkspace.name)}
                        </div>

                        <span className="block truncate">{currWorkspace.name}</span>
                      </div>

                      <CheckIcon
                        className={cn(
                          'ml-4 h-4 w-4 shrink-0',
                          workspace.id === currWorkspace.id ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </div>
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
                    <div className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center bg-transparent">
                      <PlusIcon className="h-[18px]" />
                    </div>
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
        <form onSubmit={createNewWorkspace}>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default WorkspaceSwitcher
