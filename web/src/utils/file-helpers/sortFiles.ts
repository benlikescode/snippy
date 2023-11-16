import { type FileItemType } from '@/types'

export const sortComparator = (f1: FileItemType, f2: FileItemType) => {
  if (f1.type === 'folder' && f2.type === 'file') {
    return -1
  }

  if (f1.type === 'file' && f2.type === 'folder') {
    return 1
  }

  return f1.data.name.localeCompare(f2.data.name)
}

const sortFiles = (files: FileItemType[]) => {
  files.sort(sortComparator)

  // Recursively sort the nested files/folders
  files.map((item) => item.type === 'folder' && sortFiles(item.data.files))

  return files
}

export default sortFiles
