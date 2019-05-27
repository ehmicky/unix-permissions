/* eslint-disable no-magic-numbers */
export const INVALID_NUMBER = [
  // Invalid
  NaN,
  Infinity,
  Number.EPSILON,
  Number.MAX_SAFE_INTEGER,
  Number.MAX_VALUE,
  -1,
  0.5,
  65536,
]

export const NUMBER = [
  // Each permission
  1,
  2,
  4,
  8,
  16,
  32,
  64,
  128,
  256,
  512,
  1024,
  2048,

  // Extremes
  0,
  4095,

  // Combining
  3,

  // `stat` bits
  4096,
  65535,
]
/* eslint-enable no-magic-numbers */
