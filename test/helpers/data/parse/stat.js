export const INVALID_STAT = [
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
].map(arg => ({ type: 'stat', arg }))

export const STAT = [
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
  '  ---  ---  --x',

  // File types
  'drw-------',
  'lr--------',
  'pr--------',
  'sr--------',
  'cr--------',
  'br--------',
  'Dr--------',

  // Changing order
  'rxwrwxrwx',
].map(arg => ({ type: 'stat', arg }))
