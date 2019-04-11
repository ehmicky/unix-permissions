export const SHORT_PERMISSIONS = {
  read: 'r',
  write: 'w',
  execute: 'x',
}
/* eslint-disable id-length */
export const LONG_PERMISSIONS = {
  r: 'read',
  w: 'write',
  x: 'execute',
}
/* eslint-enable id-length */

export const SPECIAL_CATEGORY = 'special'
export const PARSE_SPECIAL = {
  setuid: {
    category: 'u',
    permission: 's',
  },
  setgid: {
    category: 'g',
    permission: 's',
  },
  sticky: {
    category: 'o',
    permission: 't',
  },
}
export const SERIALIZE_SPECIAL = {
  'u s': 'setuid',
  'g s': 'setgid',
  'o t': 'sticky',
}
