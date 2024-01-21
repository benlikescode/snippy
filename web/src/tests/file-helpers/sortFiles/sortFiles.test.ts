/* eslint-disable @typescript-eslint/no-unsafe-call */
import { test1, expected1 } from '@/tests/file-helpers/sortFiles/test-cases'
import { sortFiles } from '@/utils/file-helpers'

test('Should sort item names alphabetically', () => {
  expect(sortFiles(test1)).toStrictEqual(expected1)
})
