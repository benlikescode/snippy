import cloneDeep from 'lodash.clonedeep'
import { type FileDataType, type FileItemType } from '@/types'

// TEST CASE 1
const test1: FileItemType[] = [
  {
    type: 'folder',
    id: '8564a373-2446-4c42-9da8-3dfe59c7a372',
    data: {
      name: 'House',
      files: [
        {
          type: 'file',
          id: 'c8a17bb5-172c-45e2-90c9-d5745d7825b0',
          data: { name: 'kitchen.tsx', language: 'typescript', content: '' },
        },
        {
          type: 'folder',
          id: 'a5bf52e6-f238-4165-87e4-89a29e48b74f',
          data: { name: 'Bathroom', files: [] },
        },
      ],
    },
  },
  {
    type: 'folder',
    id: '52b04c1e-492f-42a0-b61f-7f04f07e5aa9',
    data: {
      name: 'Books',
      files: [
        {
          type: 'file',
          id: '57764bee-5da9-4dbb-9bec-0ff6bfd232f6',
          data: {
            name: 'harry-potter.txt',
            language: 'text',
            content: '',
          },
        },
      ],
    },
  },
]

export const getTest1 = () => {
  return cloneDeep(test1)
}

export const parentFolderId1 = '8564a373-2446-4c42-9da8-3dfe59c7a372'

export const expectedData: FileDataType = {
  name: '',
  language: '',
  content: '',
  justCreated: true,
}
