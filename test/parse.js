'use strict'

const {
  convert: { symbolic },
} = require('../localpack')

;

[
  // Invalid
  NaN,
  Infinity,
  Number.EPSILON,
  Number.MAX_SAFE_INTEGER,
  Number.MAX_VALUE,
  -1,
  0.5,
  65536,

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

  // Invalid
  'NaN',
  '0.5',
  '10000',
  '8',
  '~1',

  // Each permission
  '1',
  '2',
  '4',
  '10',
  '20',
  '40',
  '100',
  '200',
  '400',
  '1000',
  '2000',
  '4000',

  // Extremes
  '0',
  '7777',

  // Combining
  '11',

  // Operators
  '=11',
  '+11',
  '-11',

  // Whitespace
  ' 111 ',

  // Prefixes
  '0111',
  '0o111',
  '\\111',
  '\\0111',

  // Invalid
  'rwwrwxrwx',
  '--------j',
  '--------+',
  'Br--------',
  '--------s',
  '--------S',
  '-----t---',
  '-----T---',
  '--t------',
  '--T------',
  '--------',
  '-- ---- ---',
  '-----------',

  // Each permission
  '--------x',
  '-------w-',
  '------r--',
  '-----x---',
  '----w----',
  '---r-----',
  '--x------',
  '-w-------',
  'r--------',

  // Extremes
  '---------',
  'rwxrwxrwx',

  // Combining
  '-------wx',

  // Special permissions
  '--------X',
  '-----X---',
  '--X------',
  '--------T',
  '--------t',
  '-----s---',
  '-----S---',
  '--s------',
  '--S------',

  // Whitespace
  ' --------x ',
  'd  ---  ---  --x',

  // File types
  'dr--------',
  '-r--------',
  'lr--------',
  'pr--------',
  'sr--------',
  'cr--------',
  'br--------',
  'dr--------',
  'Dr--------',

  // Changing order
  'rxwrwxrwx',

  // Invalid
  '',
  '   ',
  'abc',
  'z+x',
  'a~x',
  'a+j',
  'a+xx',

  // Each permission
  'o+x',
  'o+w',
  'o+r',
  'g+x',
  'g+w',
  'g+r',
  'u+x',
  'u+w',
  'u+r',

  // Extremes
  'a+',
  'a-',
  'a=',
  'a=rwx',

  // Combining
  'a=rw',

  // Operators
  'a-x',
  'a=x',

  // Special permissions
  'o+t',
  'g+s',
  'u+s',
  'o+s',
  'g+t',
  'u+t',
  'a+ts',

  // Whitespace
  ' a+x ',
  'u+x , u+r',

  // `all` category
  'a+x',
  'a+w',
  'a+r',

  // Grouping categories
  'go=x',
  'gog=x',
  'ag=x',
  'g=x,o=x',

  // Combining plus and minus
  'o+x,o-x',
  'o-x,o+x',
  'o+x,o+x',
  'o-x,o-x',
  'o=x,o-x',
  'o=x,o+x',
  'a+x,o-x',

  // Invalid
  undefined,
  null,
  false,
  [],
  new Map(),
  { user: undefined },
  { user: null },
  { user: [] },
  { users: {} },
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
  {},
  { user: {} },
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
].forEach(permission => {
  try {
    console.log(permission, symbolic(permission))
  } catch (error) {
    console.log(permission, error.message)
  }
})
