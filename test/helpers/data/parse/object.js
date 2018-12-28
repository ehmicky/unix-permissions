'use strict'

const object = [
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
  { user: { setgid: true } },
  { user: { sticky: true } },
  { group: { setuid: true } },
  { group: { sticky: true } },
  { others: { setuid: true } },
  { others: { setgid: true } },
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

  // Object extremes
  {
    user: { read: true, write: true, execute: true, setuid: true },
    group: { read: true, write: true, execute: true, setgid: true },
    others: { read: true, write: true, execute: true, sticky: true },
  },

  // Combining
  { user: { read: true, write: true } },

  // Operators
  { others: { read: false } },
  { others: { read: undefined } },

  // Special permissions
  { others: { sticky: true } },
  { group: { setgid: true } },
  { user: { setuid: true } },
]

module.exports = {
  object,
}
