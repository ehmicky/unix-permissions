'use strict'

const test = require('ava')

const { SERIALIZE_DATA, testCommand } = require('./helpers')

SERIALIZE_DATA.forEach(({ type, args, title }) => {
  // eslint-disable-next-line max-nested-callbacks
  test(`[${type}] should serialize ${title}`, t =>
    testCommand({ t, command: `convert.${type}`, args }))
})
