/* eslint-disable @typescript-eslint/no-unsafe-call */
import { sortFiles } from '@/utils/file-helpers'
import { test1, expected1 } from '@/tests/file-helpers/sortFiles/test-cases'

test('Should sort item names alphabetically', () => {
  expect(sortFiles(test1)).toStrictEqual(expected1)
})
