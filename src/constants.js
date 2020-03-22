export const NODES = [
  {
    category: 'u',
    permission: 'r',
  },
  {
    category: 'u',
    permission: 'w',
  },
  {
    category: 'u',
    permission: 'x',
  },
  {
    category: 'u',
    permission: 's',
  },
  {
    category: 'g',
    permission: 'r',
  },
  {
    category: 'g',
    permission: 'w',
  },
  {
    category: 'g',
    permission: 'x',
  },
  {
    category: 'g',
    permission: 's',
  },
  {
    category: 'o',
    permission: 'r',
  },
  {
    category: 'o',
    permission: 'w',
  },
  {
    category: 'o',
    permission: 'x',
  },
  {
    category: 'o',
    permission: 't',
  },
]
export const ORDER = [
  'u r',
  'u w',
  'u x',
  'u s',
  'g r',
  'g w',
  'g x',
  'g s',
  'o r',
  'o w',
  'o x',
  'o t',
]

export const CATEGORIES = ['u', 'g', 'o']
export const SHORT_CATEGORIES = {
  user: 'u',
  group: 'g',
  others: 'o',
}
/* eslint-disable id-length */
export const LONG_CATEGORIES = {
  u: 'user',
  g: 'group',
  o: 'others',
}

export const PERMISSIONS = ['r', 'w', 'x', 't', 's']
export const SPECIAL_PERMISSIONS = new Set(['t', 's'])
export const CATEGORY_PERMISSIONS = {
  a: ['x', 'w', 'r', 't', 's'],
  u: ['x', 'w', 'r', 's'],
  g: ['x', 'w', 'r', 's'],
  o: ['x', 'w', 'r', 't'],
}
/* eslint-enable id-length */
