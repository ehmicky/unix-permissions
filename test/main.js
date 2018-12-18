'use strict'

const test = require('ava')

const { getType } = require('../localpack')

test('Dummy test', t => {
  t.is(typeof getType, 'function')
})
