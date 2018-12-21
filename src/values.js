'use strict'

const { keyBy } = require('./utils')

// Must be sorted by `order` because some types' serialization relies on
// `tokens` being sorted accordingly.
/* eslint-disable no-magic-numbers */
const TOKENS = [
  { category: 'u', permission: 'r', value: 2 ** 8, order: 0 },
  { category: 'u', permission: 'w', value: 2 ** 7, order: 1 },
  { category: 'u', permission: 'x', value: 2 ** 6, order: 2 },
  { category: 'u', permission: 's', value: 2 ** 11, order: 3 },
  { category: 'g', permission: 'r', value: 2 ** 5, order: 4 },
  { category: 'g', permission: 'w', value: 2 ** 4, order: 5 },
  { category: 'g', permission: 'x', value: 2 ** 3, order: 6 },
  { category: 'g', permission: 's', value: 2 ** 10, order: 7 },
  { category: 'o', permission: 'r', value: 2 ** 2, order: 8 },
  { category: 'o', permission: 'w', value: 2 ** 1, order: 9 },
  { category: 'o', permission: 'x', value: 2 ** 0, order: 10 },
  { category: 'o', permission: 't', value: 2 ** 9, order: 11 },
]
/* eslint-enable no-magic-numbers */

const TOKENS_MAP = keyBy(TOKENS, ['category', 'permission'])

/* eslint-disable id-length */
const PERMISSION_CATEGORIES = {
  x: ['o', 'g', 'u'],
  w: ['o', 'g', 'u'],
  r: ['o', 'g', 'u'],
  t: ['o'],
  s: ['g', 'u'],
}
/* eslint-enable id-length */

/* eslint-disable id-length */
const CATEGORY_PERMISSIONS = {
  a: ['x', 'w', 'r', 't', 's'],
  o: ['x', 'w', 'r', 't'],
  g: ['x', 'w', 'r', 's'],
  u: ['x', 'w', 'r', 's'],
}
/* eslint-enable id-length */

const CATEGORIES = ['u', 'g', 'o']
const PERMISSIONS = ['r', 'w', 'x', 't', 's']

const OPERATORS = {
  true: '+',
  false: '-',
}

module.exports = {
  TOKENS,
  TOKENS_MAP,
  PERMISSION_CATEGORIES,
  CATEGORY_PERMISSIONS,
  CATEGORIES,
  PERMISSIONS,
  OPERATORS,
}
