'use strict'

const { keyBy } = require('./utils')

const VALUES = [
  { category: 'u', permission: 'r', shift: 8, order: 0 },
  { category: 'u', permission: 'w', shift: 7, order: 1 },
  { category: 'u', permission: 'x', shift: 6, order: 2 },
  { category: 'u', permission: 's', shift: 11, order: 3 },
  { category: 'g', permission: 'r', shift: 5, order: 4 },
  { category: 'g', permission: 'w', shift: 4, order: 5 },
  { category: 'g', permission: 'x', shift: 3, order: 6 },
  { category: 'g', permission: 's', shift: 10, order: 7 },
  { category: 'o', permission: 'r', shift: 2, order: 8 },
  { category: 'o', permission: 'w', shift: 1, order: 9 },
  { category: 'o', permission: 'x', shift: 0, order: 10 },
  { category: 'o', permission: 't', shift: 9, order: 11 },
]

const VALUES_MAP = keyBy(VALUES, ['category', 'permission'])

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

const ADDS = {
  true: '+',
  false: '-',
}

module.exports = {
  VALUES_MAP,
  PERMISSION_CATEGORIES,
  CATEGORY_PERMISSIONS,
  CATEGORIES,
  PERMISSIONS,
  ADDS,
}
