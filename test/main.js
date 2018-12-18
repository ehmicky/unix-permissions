'use strict'

const test = require('ava')

const { getType, isValid } = require('../localpack')

test('Dummy test', t => {
  t.is(typeof getType, 'function')
  t.is(typeof isValid, 'function')
})
