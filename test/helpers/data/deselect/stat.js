'use strict'

module.exports = [
  // Invalid
  'rww',
  'd--j',
  'd--+',
  'Br--',
  'd--',
  'd-----',

  // Each permission
  'd--x',
  'd-w-',
  'dr--',

  // Extremes
  'd---',
  'drwx',

  // Combining
  'd-wx',

  // Special permissions
  'd--X',
  'd--T',
  'd--t',
  'd--s',
  'd--S',

  // Whitespace
  'd --x ',

  // File types
  'drw-',
  'lr--',
  'pr--',
  'sr--',
  'cr--',
  'br--',
  'Dr--',

  // Changing order
  'drxw',
]
