'use client'

import { type FormEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import useSnippyStore from '@/stores/useSnippyStore'

const NewPrompt = () => {
  const [open, setOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [variable, setVariable] = useState('')

  const { prompts, addPrompt } = useSnippyStore()
  const { toast } = useToast()

  const addNewPrompt = (e: FormEvent) => {
    e.preventDefault()

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
        <Button
          variant="secondary"
          className="h-12 w-full rounded-[10px] border border-[#ffffff09] bg-[#1f1f1f] text-[18px] text-[#989898] hover:bg-[#252525]"
        >
          Add Prompt
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Prompt</DialogTitle>
        </DialogHeader>
        <form onSubmit={addNewPrompt}>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Input id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="variable">Variable</Label>
              <Input id="variable" value={variable} onChange={(e) => setVariable(e.target.value)} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="modal" type="submit">
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewPrompt
