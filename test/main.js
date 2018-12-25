'use strict'

const test = require('ava')

const {
  getType,
  isValid,
  convert: { symbolic, number, stat, octal, object },
  full,
  contains,
  set,
} = require('../localpack')

test('Dummy test', t => {
  ;[
    getType,
    isValid,
    symbolic,
    number,
    stat,
    octal,
    object,
    full,
    contains,
    set,
  ].forEach(
    // eslint-disable-next-line max-nested-callbacks
    func => t.is(typeof func, 'function'),
  )
})
