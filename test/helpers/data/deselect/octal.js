'use strict'

module.exports = [
  // Invalid
  'NaN',
  '0.5',
  '20',
  '8',
  '~1',

  // Each permission
  '1',
  '2',
  '4',
  '10',

  // Extremes
  '0',
  '17',

  // Combining
  '11',

  // Operators
  '=11',
  ' +11',
  '-11',

  // Whitespace
  ' 11 ',

  // Prefixes
  '011',
  '0o11',
  '\\11',
  '\\011',
]
