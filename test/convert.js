import test from 'ava'

import { convert, normalize } from '../src/main.js'

import { isValid } from './helpers/valid.js'
import { CONVERT_DATA } from './helpers/data/convert.js'

// Conversion between some types loses information
const isConvertible = function({ type, otherType }) {
  return LOSSY_CONVERSIONS.every(
    ([typeA, otherTypeA]) => typeA !== type || otherTypeA !== otherType,
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

CONVERT_DATA
  .filter(isValid)
  .filter(isConvertible)
  .forEach(({ args: [arg], type, otherType }) => {
    test(`should have idempotent 'convert' ${otherType} ${JSON.stringify(
      arg,
    )}`, t => {
      t.deepEqual(normalize(arg), convert[type](convert[otherType](arg)))
    })
  })
