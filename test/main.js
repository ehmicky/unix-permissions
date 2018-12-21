'use strict'

const test = require('ava')

const { getType, isValid, convert, symbolic, number } = require('../localpack')

test('Dummy test', t => {
  t.is(typeof getType, 'function')
  t.is(typeof isValid, 'function')
  t.is(typeof convert, 'function')
  t.is(typeof symbolic, 'function')
  t.is(typeof number, 'function')
})
