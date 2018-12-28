'use strict'

const test = require('ava')

const { SELECT_DATA, testCommand } = require('./helpers')

SELECT_DATA.forEach(({ category, type, args, title }) =>
  // eslint-disable-next-line max-nested-callbacks
  test(`[${type}] should select.${category} ${title}`, t =>
    testCommand({ t, command: `select.${category}`, args })),
)
