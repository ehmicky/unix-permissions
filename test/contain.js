'use strict'

const test = require('ava')

const { contain } = require('../localpack')

const {
  PARSE_DATA,
  CONTAIN_DATA,
  performTests,
  normalizeArg,
} = require('./helpers')

performTests({
  title: ([arg, ...args]) =>
    `should test whether ${arg} contains ${args.join(' ')}`,
  command: 'contain',
  data: CONTAIN_DATA,
})

PARSE_DATA.forEach(({ type, args: [arg], title }) => {
  // eslint-disable-next-line max-nested-callbacks
  test(`[${type}] should 'contain' itself with ${title}`, t => {
    const argA = normalizeArg({ t, arg })

    if (argA === undefined) {
      return
    }

    t.true(contain(argA, argA))
  })
})
