'use strict'

module.exports = [
  // Invalid
  'rwwrwxrwx',
  'd--------j',
  'd--------+',
  'Br--------',
  'd--------s',
  'd--------S',
  'd-----t---',
  'd-----T---',
  'd--t------',
  'd--T------',
  'd--------',
  'd-- ---- ---',
  'd-----------',

  // Each permission
  'd--------x',
  'd-------w-',
  'd------r--',
  'd-----x---',
  'd----w----',
  'd---r-----',
  'd--x------',
  'd-w-------',
  'dr--------',

  // Extremes
  'd---------',
  'drwxrwxrwx',

  // Combining
  'd-------wx',

  // Special permissions
  'd--------X',
  'd-----X---',
  'd--X------',
  'd--------T',
  'd--------t',
  'd-----s---',
  'd-----S---',
  'd--s------',
  'd--S------',

  // Whitespace
  'd --------x ',
  'd  ---  ---  --x',

  // File types
  'drw-------',
  'lr--------',
  'pr--------',
  'sr--------',
  'cr--------',
  'br--------',
  'Dr--------',

  // Changing order
  'drxwrwxrwx',
]
