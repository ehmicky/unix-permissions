'use strict'

const test = require('ava')

const {
  getType,
  isValid,
  convert,
  symbolic,
  number,
  stat,
  octal,
  object,
} = require('../localpack')

test('Dummy test', t => {
  // eslint-disable-next-line max-nested-callbacks
  ;[getType, isValid, convert, symbolic, number, stat, octal, object].forEach(
    func => t.is(typeof func, 'function'),
  )
})
