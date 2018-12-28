'use strict'

const test = require('ava')

const {
  convert: { symbolic },
} = require('../localpack')

const { PARSE_DATA, testCommand } = require('./helpers')

/* eslint-disable max-nested-callbacks */
PARSE_DATA.forEach(({ type, args, title }) =>
  test(`[${type}] should parse ${title}`, t =>
    testCommand({ t, func: symbolic, command: 'convert.symbolic', args })),
)
/* eslint-enable max-nested-callbacks */
