'use strict'

const test = require('ava')

const {
  convert: { symbolic },
} = require('../localpack')

const { PARSE_DATA, testCommand, stringify } = require('./helpers')

/* eslint-disable max-nested-callbacks */
PARSE_DATA.forEach(({ type, args }) =>
  test(`[${type}] should parse ${stringify(args[0])}`, t =>
    testCommand({ t, func: symbolic, command: 'convert.symbolic', args })),
)
/* eslint-enable max-nested-callbacks */
