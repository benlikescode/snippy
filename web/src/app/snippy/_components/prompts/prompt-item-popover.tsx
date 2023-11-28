import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type FC, useState } from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { useToast } from '@/components/ui/use-toast'
import useSnippyStore from '@/stores/useSnippyStore'
import { type PromptType } from '@/types'

type Props = {
  promptItem: PromptType
}

const PromptItemPopover: FC<Props> = ({ promptItem }) => {
  const [open, setOpen] = useState(false)

  const [prompt, setPrompt] = useState(promptItem.prompt)
  const [variable, setVariable] = useState(promptItem.variable)

  const { prompts, updatePrompt, removePrompt } = useSnippyStore()
  const { toast } = useToast()

  const editPrompt = () => {
    if (!prompt || !variable) {
      return toast({ description: 'Missing required values' })
    }

    if (prompts.find((prompt) => prompt.id !== promptItem.id && prompt.variable === variable)) {
      return toast({ description: `A Prompt already exists with the variable ${variable}` })
    }

    updatePrompt({ id: promptItem.id, prompt, variable })
    setOpen(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
            <EllipsisVerticalIcon className="h-5 text-[#575757]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setOpen(true)}>Edit Prompt</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => removePrompt(promptItem.id)} className="text-red-400">
            Delete Prompt
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Prompt</DialogTitle>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Input id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variable">Variable</Label>
                <Input
                  id="variable"
                  value={variable}
                  onChange={(e) => setVariable(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="modal" type="submit" onClick={() => editPrompt()}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PromptItemPopover
