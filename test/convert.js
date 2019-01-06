'use strict'

const test = require('ava')

const { convert } = require('../localpack')

const { CONVERT_DATA, normalizeArg } = require('./helpers')

CONVERT_DATA.forEach(({ type, typeA, args: [arg], title }) => {
  // eslint-disable-next-line max-nested-callbacks
  test(`[${type}] should have idempotent 'convert.${typeA}' with ${title}`, t => {
    const argA = normalizeArg({ t, arg })

    if (argA === undefined) {
      return
    }

    if (isLossy(type, typeA)) {
      t.true(true)
      return
    }

    const argB = convert[typeA](argA)
    const argC = convert[type](argB)
    t.deepEqual(argA, argC)
  })
})

// Conversion between some types loses information
const isLossy = function(type, typeA) {
  return LOSSY_CONVERSIONS.some(
    types => types[0] === type && types[1] === typeA,
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
