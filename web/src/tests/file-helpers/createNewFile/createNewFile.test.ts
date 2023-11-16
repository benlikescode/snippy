/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createNewFile } from '@/utils/file-helpers'
import { parentFolderId1, expectedData, getTest1 } from './test-cases'

test('Creating new file should return a truthy value', () => {
  const test1 = getTest1()

  expect(createNewFile(test1, parentFolderId1)).toBeTruthy()
})

test('Creating new file at root should return a truthy value', () => {
  const test1 = getTest1()

  expect(createNewFile(test1)).toBeTruthy()
})

test('Ensure new file is in expected location', () => {
  const test1 = getTest1()

  const files = createNewFile(test1, parentFolderId1)

  const parentFolder = files?.find((x) => x.id === parentFolderId1)

  if (!parentFolder || parentFolder.type !== 'folder') return

  parentFolder.data.files.some((x) => expect(x.data).toEqual(expectedData))
})

test('Ensure new file is in root', () => {
  const test1 = getTest1()

  console.log(JSON.stringify(test1))

  const files = createNewFile(test1)

  console.log(JSON.stringify(files))

  files?.some((x) => expect(x.data).toEqual(expectedData))
})
