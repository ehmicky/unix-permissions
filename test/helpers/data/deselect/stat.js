'use strict'

module.exports = [
  // Invalid
  'rww',
  '--j',
  '--+',
  'Br--',
  '--',
  '-----',

  // Each permission
  '--x',
  '-w-',
  'r--',

  // Extremes
  '---',
  'rwx',

  // Combining
  '-wx',

  // Special permissions
  '--X',
  '--T',
  '--t',
  '--s',
  '--S',

  // Whitespace
  ' --x ',

  // File types
  'drw-',
  'lr--',
  'pr--',
  'sr--',
  'cr--',
  'br--',
  'Dr--',

  // Changing order
  'rxw',
]
