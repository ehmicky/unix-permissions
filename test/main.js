'use strict'

const test = require('ava')

const {
  getType,
  isValid,
  convert,
  symbolic,
  number,
  stat,
} = require('../localpack')

test('Dummy test', t => {
  // eslint-disable-next-line max-nested-callbacks
  ;[getType, isValid, convert, symbolic, number, stat].forEach(func =>
    t.is(func, 'function'),
  )
})
