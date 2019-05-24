export const OBJECT = [
  // Invalid
  undefined,
  null,
  false,
  [],
  new Map(),
  { user: null },
  { user: [] },
  { users: {} },
  { user: { readd: true } },
  { user: { setuid: true } },
  { user: { setgid: true } },
  { user: { sticky: true } },
  { special: { read: true } },
  { special: { write: true } },
  { special: { execute: true } },
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
    special: { setuid: true, setgid: true, sticky: true },
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
  { special: { sticky: true } },
  { special: { setgid: true } },
  { special: { setuid: true } },

  // `all` category
  { all: { read: true } },
  { user: { read: false }, all: { read: true } },
  { all: { read: true }, special: { setuid: true } },
].map(arg => ({ type: 'object', arg }))
