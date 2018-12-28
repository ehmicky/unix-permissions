'use strict'

const test = require('ava')

const { DESELECT_DATA, testCommand } = require('./helpers')

DESELECT_DATA.forEach(({ category, type, args, title }) =>
  // eslint-disable-next-line max-nested-callbacks
  test(`[${type}] should deselect.${category} ${title}`, t =>
    testCommand({ t, command: `deselect.${category}`, args })),
)
