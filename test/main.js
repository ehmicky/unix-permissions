'use strict'

const test = require('ava')

const {
  type,
  convert: { symbolic, number, stat, octal, object },
  normalize,
  full,
  partial,
  contains,
  set,
  unset,
  flip,
  invert,
  min,
  max,
  select,
  deselect,
} = require('../localpack')

test('Dummy test', t => {
  ;[
    type,
    symbolic,
    number,
    stat,
    octal,
    object,
    normalize,
    full,
    partial,
    contains,
    set,
    unset,
    flip,
    invert,
    min,
    max,
    select.user,
    select.group,
    select.others,
    deselect.user,
    deselect.group,
    deselect.others,
  ].forEach(
    // eslint-disable-next-line max-nested-callbacks
    func => t.is(typeof func, 'function'),
  )
})
