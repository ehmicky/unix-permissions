'use strict'

const test = require('ava')

const { testCommand, PARSE_DATA } = require('./helpers')

PARSE_DATA.forEach(({ type, args, title }) =>
  // eslint-disable-next-line max-nested-callbacks
  test(`[${type}] should parse ${title}`, t =>
    testCommand({ t, command: 'convert.symbolic', args })),
)
