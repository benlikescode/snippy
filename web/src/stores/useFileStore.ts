import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { FileDataType, FileItemType } from '@/types'
import {
  createItem,
  createNewFile,
  createNewFolder,
  deleteItem,
  getFormattedPath,
  getPathToItem,
  moveItem,
  renameItem,
  updateItemData,
} from '@/utils/file-helpers'
import { toast } from '@/components/ui/use-toast'

type State = {
  files: FileItemType[]
  openFile: FileItemType | null
  pathToOpenFile: string[]
  fileDropzone?: string
  setFiles: (files: FileItemType[]) => void
  setOpenFile: (openFile: FileItemType | null) => void
  setPathToOpenFile: (pathToOpenFile: string[]) => void
  setFileDropzone: (fileDropzone?: string) => void
  // File Helpers
  createItem: (type: 'file' | 'folder', data: FileItemType['data'], parentFolderId: string) => void
  createNewFile: (parentFolderId?: string) => void
  createNewFolder: (parentFolderId?: string) => void
  renameItem: (id: string, newName: string) => void
  deleteItem: (id: string) => void
  moveItem: (item: FileItemType, newFolderId: string) => void
  updateItemData: (id: string, newData: Partial<FileDataType>) => void
}

const useFileStore = create<State>()(
  devtools((set) => ({
    files: [],
    openFile: null,
    pathToOpenFile: [],
    fileDropzone: undefined,
    setFiles: (files) => set(() => ({ files })),
    setOpenFile: (openFile) => set(() => ({ openFile })),
    setPathToOpenFile: (pathToOpenFile) => set(() => ({ pathToOpenFile })),
    setFileDropzone: (fileDropzone) => set(() => ({ fileDropzone })),
    createItem: (type, data, parentFolderId) =>
      set(({ files }) => {
        const newFiles = createItem(files, type, data, parentFolderId)

        if (!newFiles) {
          return { files: files }
        }

        return { files: newFiles }
      }),
    createNewFile: (parentFolderId) =>
      set(({ files }) => {
        const newFiles = createNewFile(files, parentFolderId)

        if (!newFiles) {
          return { files: files }
        }

        return { files: newFiles }
      }),
    createNewFolder: (parentFolderId) =>
      set(({ files }) => {
        const newFiles = createNewFolder(files, parentFolderId)

        if (!newFiles) {
          return { files: files }
        }

        return { files: newFiles }
      }),
    renameItem: (id, newName) =>
      set(({ files }) => {
        const res = renameItem(files, id, newName)

        if (!res) {
          toast({ description: 'Failed to rename' })
          return { files: files }
        }

        const { newFiles, item } = res

        if (item.type === 'file') {
          const newPathToFile = getFormattedPath(newFiles, item.id)

          if (newPathToFile) {
            return { files: newFiles, openFile: item, pathToOpenFile: newPathToFile }
          }
        }

        return { files: newFiles }
      }),
    deleteItem: (id) =>
      set(({ files, openFile }) => {
        const newFiles = deleteItem(files, id)

        if (!newFiles) {
          return { files: files }
        }

        if (openFile?.id) {
          const pathToOpenFile = getPathToItem(newFiles, openFile.id)

          if (!pathToOpenFile) {
            return { files: newFiles, openFile: null, pathToOpenFile: [] }
          }
        }

        return { files: newFiles }
      }),
    moveItem: (item, newFolderId) =>
      set(({ files }) => {
        const res = moveItem(files, item, newFolderId)

        if (!res) {
          // toast({ description: 'Failed to move file' })
          return { files: files }
        }

        const { newFiles, newItem } = res

        if (item.type === 'file') {
          const newPathToFile = getFormattedPath(newFiles, newItem.id)

          if (newPathToFile) {
            return { files: newFiles, openFile: newItem, pathToOpenFile: newPathToFile }
          }
        }

        return { files: newFiles }
      }),
    updateItemData: (id, newData) =>
      set(({ files }) => {
        const newFiles = updateItemData(files, id, newData)

        if (!newFiles) {
          return { files: files }
        }

        return { files: newFiles }
      }),
  })),
)

export default useFileStore
