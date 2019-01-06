'use strict'

module.exports = [
  // Invalid
  undefined,
  null,
  false,
  [],
  new Map(),
  { user: null },
  { user: [] },
  { users: new Map() },
  { user: { readd: true } },
  { others: { read: null } },
  { others: { read: {} } },

  // Each permission
  { others: { execute: true } },
  { others: { write: true } },
  { others: { read: true } },
  { group: { execute: true } },
  { group: { write: true } },
  { group: { read: true } },
  { user: { execute: true } },
  { user: { write: true } },
  { user: { read: true } },

  // Extremes
  {
    user: { read: true, write: true, execute: true },
    group: { read: true, write: true, execute: true },
    others: { read: true, write: true, execute: true },
  },

  // Combining
  { user: { read: true, write: true } },
  { user: { read: true, write: false } },

  // Operators
  { others: { read: false } },
  { others: { read: undefined } },

  // Special permissions

  // `all` category
  { all: { read: true } },
  { all: { read: true }, user: { read: false } },
  { user: { read: false }, all: { read: true } },
]
