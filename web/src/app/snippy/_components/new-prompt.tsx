'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import useSnippyStore from '@/stores/useSnippyStore'
import { v4 as uuid } from 'uuid'

const NewPrompt = () => {
  const [open, setOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [variable, setVariable] = useState('')

  const { prompts, addPrompt } = useSnippyStore()
  const { toast } = useToast()

  const addNewPrompt = () => {
    if (!prompt || !variable) {
      return toast({ description: 'Missing required values' })
    }

    if (prompts.find((prompt) => prompt.variable === variable)) {
      return toast({ description: `A Prompt already exists with the variable ${variable}` })
    }

    addPrompt({ id: uuid(), prompt, variable })
    closeModal()
  }

  const closeModal = () => {
    setPrompt('')
    setVariable('')
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-12 w-full rounded-[6px]">
          Add Prompt
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Prompt</DialogTitle>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Input
                id="prompt"
                placeholder="What is the name of this file?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variable">Variable</Label>
              <Input
                id="variable"
                placeholder="$ name"
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
          <Button type="submit" onClick={() => addNewPrompt()}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewPrompt
