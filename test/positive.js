'use strict'

const test = require('ava')

const { positive } = require('../localpack')

const {
  PARSE_DATA,
  POSITIVE_DATA,
  performTests,
  normalizeArg,
} = require('./helpers')

performTests({
  title: args => `should return positive ${args}`,
  command: 'positive',
  data: POSITIVE_DATA,
})

PARSE_DATA.forEach(({ type, args: [arg], title }) => {
  // eslint-disable-next-line max-nested-callbacks
  test(`[${type}] should have idempotent 'positive' with ${title}`, t => {
    const argA = normalizeArg({ t, arg })

    if (argA === undefined) {
      return
    }

    const argB = positive(argA)
    const argC = positive(argB)
    t.deepEqual(argB, argC)
  })
})
