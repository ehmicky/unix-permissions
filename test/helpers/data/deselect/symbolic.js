'use strict'

module.exports = [
  // Invalid
  '',
  '   ',
  'abc',
  '~x',
  '+j',
  '+xx',

  // Each permission
  '+x',
  '+w',
  '+r',

  // Extremes
  '+',
  '=',
  '=rwx',

  // Combining
  '=rw',
  '+x,+x',
  '+x,-x',
  '+x,-r',

  // Operators
  '=x',

  // Special permissions
  '+t',
  '+s',
  '+ts',

  // Whitespace
  ' +x ',
  ' +x, +x ',
]
