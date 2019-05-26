import test from 'ava'

import { convert, normalize } from '../src/main.js'

import { CONVERT_DATA } from './helpers/data/convert.js'

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

CONVERT_DATA.forEach(({ arg, type, otherType }) => {
  if (isLossy(type, otherType)) {
    return
  }

  test(`convert() idempotence ${JSON.stringify({ arg, otherType })}`, t => {
    t.deepEqual(normalize(arg), convert[type](convert[otherType](arg)))
  })
})
