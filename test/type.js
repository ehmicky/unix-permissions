'use strict'

const test = require('ava')

const { type: getType } = require('../localpack')

const { PARSE_DATA, testCommand } = require('./helpers')

PARSE_DATA.forEach(({ type, args, title }) =>
  // eslint-disable-next-line max-nested-callbacks
  test(`[${type}] should find type of ${title}`, t =>
    testCommand({ t, func: getType, command: 'type', args })),
)
