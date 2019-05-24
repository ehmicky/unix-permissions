import test from 'ava'

import { convert } from '../src/main.js'

import { normalizeData } from './helpers/check.js'
import { CONVERT_DATA } from './helpers/data/convert.js'

// Conversion between some types loses information
const isNotLossy = function({ type, otherType }) {
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

normalizeData(CONVERT_DATA).filter(isNotLossy).forEach(datum => {
  test(`should have idempotent 'convert' ${JSON.stringify(datum)}`, t => {
    const { arg, type, otherType } = datum
    const argA = convert[otherType](arg)
    const argB = convert[type](argA)
    t.deepEqual(arg, argB)
  })
})
