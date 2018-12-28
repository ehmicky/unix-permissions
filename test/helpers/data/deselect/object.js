'use strict'

module.exports = [
  // Invalid
  undefined,
  null,
  false,
  [],
  { readd: true },
  { read: null },
  { read: {} },

  // Each permission
  { execute: true },
  { write: true },
  { read: true },

  // Extremes
  { read: true, write: true, execute: true },

  // Combining
  { read: true, write: true },

  // Operators
  { read: false },
  { read: undefined },

  // Special permissions
  { sticky: true },
  { setgid: true },
  { setuid: true },
]
