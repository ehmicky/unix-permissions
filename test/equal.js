'use strict'

const test = require('ava')

const { equal } = require('../localpack')

const {
  PARSE_DATA,
  EQUAL_DATA,
  performTests,
  normalizeArg,
} = require('./helpers')

performTests({
  title: ([arg, ...args]) =>
    `should test whether ${arg} equals ${args.join(' ')}`,
  command: 'equal',
  data: EQUAL_DATA,
})

PARSE_DATA.forEach(({ type, args: [arg], title }) => {
  // eslint-disable-next-line max-nested-callbacks
  test(`[${type}] should 'equal' itself with ${title}`, t => {
    const argA = normalizeArg({ t, arg })

    if (argA === undefined) {
      return
    }

    t.true(equal(argA, argA))
  })
})
