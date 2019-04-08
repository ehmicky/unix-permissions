import { convert } from '../src/main.js'

import { performChecks } from './helpers/check.js'
import { CONVERT_DATA } from './helpers/data/convert.js'

const check = function({ t, arg, type, otherType }) {
  if (isLossy({ type, otherType })) {
    t.true(true)
    return
  }

  const argA = convert[otherType](arg)
  const argB = convert[type](argA)
  t.deepEqual(arg, argB)
}

// Conversion between some types loses information
const isLossy = function({ type, otherType }) {
  return LOSSY_CONVERSIONS.some(
    types => types[0] === type && types[1] === otherType,
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

performChecks({
  name: "should have idempotent 'convert'",
  data: CONVERT_DATA,
  check,
})
