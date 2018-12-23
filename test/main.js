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
  ;[getType, isValid, convert, symbolic, number, stat, octal, object].forEach(
    // eslint-disable-next-line max-nested-callbacks
    func => t.is(typeof func, 'function'),
  )
})
