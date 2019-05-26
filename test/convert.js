import test from 'ava'

import { convert, normalize, type as getType } from '../src/main.js'

import { TYPES } from './helpers/data/types.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'

// Conversion between some types loses information
const isLossy = function(type, otherType) {
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

TYPES.forEach(otherType => {
  VALID_PARSE_DATA.forEach(arg => {
    const type = getType(arg)

    if (isLossy(type, otherType)) {
      return
    }

    // eslint-disable-next-line max-nested-callbacks
    test(`convert idempotence ${JSON.stringify(otherType)} ${JSON.stringify(arg)}`, t => {
      t.deepEqual(normalize(arg), convert[type](convert[otherType](arg)))
    })
  })
})
