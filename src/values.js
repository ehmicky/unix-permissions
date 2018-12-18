'use strict'

/* eslint-disable no-magic-numbers */
const VALUES = [
  { category: 'o', permission: 'x', value: 2 ** 0 },
  { category: 'o', permission: 'w', value: 2 ** 1 },
  { category: 'o', permission: 'r', value: 2 ** 2 },
  { category: 'g', permission: 'x', value: 2 ** 3 },
  { category: 'g', permission: 'w', value: 2 ** 4 },
  { category: 'g', permission: 'r', value: 2 ** 5 },
  { category: 'u', permission: 'x', value: 2 ** 6 },
  { category: 'u', permission: 'w', value: 2 ** 7 },
  { category: 'u', permission: 'r', value: 2 ** 8 },
  { category: 'o', permission: 't', value: 2 ** 9 },
  { category: 'g', permission: 's', value: 2 ** 10 },
  { category: 'u', permission: 's', value: 2 ** 11 },
]
/* eslint-enable no-magic-numbers */

const getValuesMap = function() {
  const values = VALUES.map(({ category, permission, value }) => ({
    [`${category} ${permission}`]: value,
  }))
  return Object.assign({}, ...values)
}

const VALUES_MAP = getValuesMap()

const CATEGORIES = ['o', 'g', 'u']
const PERMISSIONS = ['x', 'w', 'r', 't', 's']

module.exports = {
  VALUES_MAP,
  CATEGORIES,
  PERMISSIONS,
}
