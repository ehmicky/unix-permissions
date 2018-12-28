'use strict'

const test = require('ava')

const {
  convert: { symbolic },
} = require('../localpack')

const { PARSE_DATA, testCommand } = require('./helpers')

PARSE_DATA.forEach(({ type, args, title }) =>
  // eslint-disable-next-line max-nested-callbacks
  test(`[${type}] should parse ${title}`, t =>
    testCommand({ t, func: symbolic, command: 'convert.symbolic', args })),
)
