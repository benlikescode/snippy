import { useCallback } from 'react'
import { type FileWithPath, useDropzone } from 'react-dropzone'
import { useToast } from '@/components/ui/use-toast'
import useFileStore from '@/stores/useFileStore'
import type { FileDataType, FileItemType, FolderDataType } from '@/types'
import getFileLanguage from '@/utils/file-helpers/getFileLanguage'
import { MAX_FILES_PER_TEMPLATE, MAX_FILE_SIZE } from '@/validations/template.validations'

type FileOrFolder = {
  type: 'file' | 'folder'
  name: string
  language?: string
  content?: string
  file: FileWithPath
  files?: FileOrFolder[]
}

export const useFileDropzone = (item: FileItemType, canDropFile: boolean) => {
  const { files, setFileDropzone, createItem } = useFileStore()
  const { toast } = useToast()

  const buildFolderStructure = async (files: FileWithPath[]) => {
    const root: FileOrFolder[] = []

    for (const file of files) {
      if (!file.path) continue

      const parts = file.path.split('/').filter((part) => part !== '')

      let currentLevel = root

      for (const part of parts) {
        let existingItem = currentLevel.find((item) => item.name === part)

        if (!existingItem) {
          const type = part.includes('.') ? 'file' : 'folder'

          if (type === 'file') {
            const fileContent = await readFileContent(file)

            existingItem = {
              type,
              name: part,
              language: getFileLanguage(part),
              file,
              content: fileContent ?? '',
            }
          } else {
            existingItem = {
              type,
              name: part,
              file,
            }
          }

          currentLevel.push(existingItem)
          existingItem.files = []
        }

        currentLevel = existingItem.files ?? []
      }
    }

    return root
  }

  const readFileContent = async (file: FileWithPath): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        const fileContent = reader.result

        if (fileContent === null || typeof fileContent !== 'string') {
          reject('Failed to read file contents')
          return
        }

        resolve(fileContent)
      }

      reader.onerror = () => {
        reject('Failed to read file contents')
      }

      reader.readAsText(file)
    })
  }

  const createFolder = (file: FileOrFolder) => {
    if (!file.files) return

    const folderData: FolderDataType = {
      name: file.name,
      files: file.files as any,
    }

    createItem('folder', folderData, item.id)
  }

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      setFileDropzone(undefined)

      // File validation
      if (acceptedFiles.length > MAX_FILES_PER_TEMPLATE) {
        return toast({
          variant: 'destructive',
          description: `You can only upload a maximum of ${MAX_FILES_PER_TEMPLATE} files`,
        })
      }

      if (acceptedFiles.some((file) => file.size > MAX_FILE_SIZE)) {
        return toast({
          variant: 'destructive',
          description: `Files must not exceed ${MAX_FILE_SIZE / 1000} KB in size`,
        })
      }

      const folderStructure = await buildFolderStructure(acceptedFiles)

      for (const fileItem of folderStructure) {
        if (fileItem.type === 'file') {
          const fileData: FileDataType = {
            name: fileItem.name,
            language: fileItem.language ?? '',
            content: fileItem.content ?? '',
          }

          createItem('file', fileData, item.id)
        } else {
          createFolder(fileItem)
        }
      }
    },
    [files],
  )

  const dropzone = useDropzone({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onDrop,
    onDragEnter: () => setFileDropzone(item.id),
    noDragEventsBubbling: true,
    noClick: true,
    noDrag: !canDropFile,
    preventDropOnDocument: true,
    noKeyboard: true,
  })

  return { ...dropzone }
}
