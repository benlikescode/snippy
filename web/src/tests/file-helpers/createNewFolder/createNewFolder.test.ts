/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createNewFolder } from '@/utils/file-helpers'
import { test1, parentFolderId1, expectedData1 } from './test-cases'

test('Creating new file should return a truthy value', () => {
  expect(createNewFolder(test1, parentFolderId1)).toBeTruthy()
})

test('Ensure new file is in expected location', () => {
  const files = createNewFolder(test1, parentFolderId1)

  const parentFolder = files?.find((x) => x.id === parentFolderId1)

  if (!parentFolder || parentFolder.type !== 'folder') return

  const shouldBeTrue = parentFolder.data.files.some((x) => x.data === expectedData1)

  expect(shouldBeTrue).toBe(true)
})
