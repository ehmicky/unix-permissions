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
]
/* eslint-enable no-magic-numbers */

const getValuesMap = function() {
  const values = VALUES.map(({ category, permission, value }) => ({
    [`${category} ${permission}`]: value,
  }))
  return Object.assign({}, ...values)
}

const VALUES_MAP = getValuesMap()

module.exports = {
  VALUES_MAP,
}
