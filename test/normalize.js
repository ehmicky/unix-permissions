'use strict'

const test = require('ava')

const { normalize } = require('../localpack')

const { PARSE_DATA, performTests, normalizeArg } = require('./helpers')

performTests({
  title: ({ type, title }) => `[${type}] should normalize ${title}`,
  command: 'normalize',
  data: PARSE_DATA,
})

PARSE_DATA.forEach(({ type, args: [arg], title }) => {
  // eslint-disable-next-line max-nested-callbacks
  test(`[${type}] should have idempotent 'normalize' with ${title}`, t => {
    const argA = normalizeArg({ t, arg })

    if (argA === undefined) {
      return
    }

    const argB = normalize(argA)
    t.deepEqual(argA, argB)
  })
})
