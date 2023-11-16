/* eslint-disable @typescript-eslint/no-unsafe-call */
import { deleteItem } from '@/utils/file-helpers'
import { test1, deletedId1, expected1, test2, deletedId2, expected2 } from './test-cases'

test('Should delete Books folder from root', () => {
  expect(deleteItem(test1, deletedId1)).toStrictEqual(expected1)
})

test('Should delete nested kitchen.tsx folder', () => {
  expect(deleteItem(test2, deletedId2)).toStrictEqual(expected2)
})
