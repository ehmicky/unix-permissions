'use strict'

const test = require('ava')

const { get, set, test: testUmask } = require('../localpack')

test('Dummy test', t => {
  t.is(typeof get, 'function')
  t.is(typeof set, 'function')
  t.is(typeof testUmask, 'function')
})
