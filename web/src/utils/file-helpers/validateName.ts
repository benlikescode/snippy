import { toast } from '@/components/ui/use-toast'
import { type FileItemType } from '@/types'

const validateName = (siblingFiles: FileItemType[], item: FileItemType) => {
  if (siblingFiles.some((file) => file.data.name === item.data.name)) {
    toast({
      description: `A file or folder ${item.data.name} already exists at this location.`,
      variant: 'destructive',
    })
    return false
  }

  return true
}

export default validateName
