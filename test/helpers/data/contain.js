import { BASE_SET_DATA } from './set.js'

export const CONTAIN_DATA = [
  ...BASE_SET_DATA,

  // Equal operator
  ['o=x', 'o=x'],
  ['a=x', 'a=x'],
  ['a=rwxst', 'a=rwxst'],

  // Special permission
  ['o+t', 'o+t'],
  ['o+t', 'o-t'],
  ['g+s', 'g+s'],
  ['g+s', 'g-s'],
  ['u+s', 'u+s'],
  ['u+s', 'u-s'],

  // Combining
  ['o+x,o-r', 'o+x,o-r'],
  ['o+x,o-r', 'o+x'],
  ['o+x,o-r', 'o-r'],
  ['o+x', 'o+x,o-r'],
  ['o-r', 'o+x,o-r'],

  // Several arguments
  ['o+xr', 'o+x', 'o+r'],
  ['o+x', 'o+x', 'o+r'],
]
