import { type FileItemType } from '@/types'

export const FILES = [
  {
    type: 'folder',
    id: '8564a373-2446-4c42-9da8-3dfe59c7a372',
    data: {
      name: 'House',
      files: [
        {
          type: 'folder',
          id: 'a5bf52e6-f238-4165-87e4-89a29e48b74f',
          data: { name: 'Bathroom', files: [] },
        },
        {
          type: 'file',
          id: 'c8a17bb5-172c-45e2-90c9-d5745d7825b0',
          data: { name: 'kitchen.tsx', language: 'typescript', content: '' },
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
            content:
              'import React from react;\n' +
              '\n' +
              'const test = (num) => return num;\n' +
              '\n' +
              'console.log(test({{num}}))',
          },
        },
      ],
    },
  },
  {
    type: 'folder',
    id: 'fee0711a-c131-4ab8-8149-84e10bffe28d',
    data: {
      name: 'Teams',
      files: [
        {
          type: 'folder',
          id: '106ee9c1-386b-4c59-a5d2-2ddf20231f7e',
          data: {
            name: 'Hockey',
            files: [
              {
                type: 'file',
                id: '6b87de19-711f-473d-8fe9-c265967936be',
                data: { name: 'capitals.js', language: 'javascript', content: '' },
              },
            ],
          },
        },
      ],
    },
  },
] as FileItemType[]
