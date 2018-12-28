'use strict'

/* eslint-disable no-magic-numbers */
module.exports = [
  // Invalid
  NaN,
  Infinity,
  Number.EPSILON,
  Number.MAX_SAFE_INTEGER,
  Number.MAX_VALUE,
  -1,
  0.5,
  16,

  // Each permission
  1,
  2,
  4,
  8,

  // Extremes
  0,
  15,

  // Combining
  3,
]
/* eslint-enable no-magic-numbers */
