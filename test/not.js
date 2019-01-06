'use strict'

const test = require('ava')

const { not } = require('../localpack')

const {
  SIMPLE_DATA,
  PARSE_DATA,
  performTests,
  normalizeArg,
} = require('./helpers')

performTests({
  title: args => `should negate ${args}`,
  command: 'not',
  data: SIMPLE_DATA,
})

PARSE_DATA.forEach(({ type, args: [arg], title }) => {
  // eslint-disable-next-line max-nested-callbacks
  test(`[${type}] should have idempotent 'not' with ${title}`, t => {
    const argA = normalizeArg({ t, arg })

    if (argA === undefined) {
      return
    }

    const argB = not(not(argA))
    t.deepEqual(argA, argB)
  })
})
