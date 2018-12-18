'use strict'

const test = require('ava')

const { parse } = require('../localpack')

test('Dummy test', t => {
  t.is(typeof parse, 'function')
})
