'use strict'

const PARSE_CONSTANTS = {
  user: {
    category: 'u',
    permissions: { read: 'r', write: 'w', execute: 'x', setuid: 's' },
  },
  group: {
    category: 'g',
    permissions: { read: 'r', write: 'w', execute: 'x', setgid: 's' },
  },
  others: {
    category: 'o',
    permissions: { read: 'r', write: 'w', execute: 'x', sticky: 't' },
  },
}

module.exports = {
  PARSE_CONSTANTS,
}
