import { type FC } from 'react'
import { type FileItemType } from '@/types'
import File from './file'
import Folder from './folder'

type Props = {
  item: FileItemType
  canDropFile: boolean
  level?: number
}

const FileSystemItem: FC<Props> = ({ item, canDropFile, level = 0 }) => {
  if (item.type === 'folder') {
    return <Folder item={item} level={level} canDropFile={canDropFile} />
  }

  return <File item={item} level={level} />
}

export default FileSystemItem
