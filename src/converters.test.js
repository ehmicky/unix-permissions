import test from 'ava'
import { each } from 'test-each'

import { VALID_FULL_DATA } from './helpers/data/full/main.test.js'
import { TYPES } from './helpers/data/types.test.js'

import { convert, normalize, type as getType } from 'unix-permissions'

// Conversion between some types loses information
const isLossy = function (type, otherType) {
  return LOSSY_CONVERSIONS.some(
    ([typeA, otherTypeA]) => typeA === type && otherTypeA === otherType,
  )
}

const LOSSY_CONVERSIONS = [
  ['symbolic', 'number'],
  ['symbolic', 'stat'],
  ['symbolic', 'octal'],
  ['object', 'number'],
  ['object', 'stat'],
  ['object', 'octal'],
  ['octal', 'number'],
  ['octal', 'stat'],
]

each(TYPES, VALID_FULL_DATA, ({ title }, otherType, arg) => {
  const type = getType(arg)

  if (isLossy(type, otherType)) {
    return
  }

  test(`convert (idempotence) | ${title}`, (t) => {
    t.deepEqual(normalize(arg), convert[type](convert[otherType](arg)))
  })
})
