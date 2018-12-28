'use strict'

const test = require('ava')

const { SERIALIZE_DATA, testCommand } = require('./helpers')

SERIALIZE_DATA.forEach(({ type, args, func, title }) => {
  // eslint-disable-next-line max-nested-callbacks
  test(`[${type}] should serialize ${title}`, t =>
    testCommand({ t, func, command: `convert.${type}`, args }))
})
