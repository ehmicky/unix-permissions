'use strict'

const CONTAINS_DATA = [
  // Contains `+`
  ['o+x', 'o+x'],
  ['o+', 'o+x'],
  ['o-x', 'o+x'],

  // Contains `-`
  ['o+x', 'o-x'],
  ['o+', 'o-x'],
  ['o-x', 'o-x'],

  // Contains with missing permission
  ['o+x', 'o+'],
  ['o+', 'o+'],
  ['o-x', 'o+'],

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
  ['o+x', 'o+x,o-r'],
  ['o-r', 'o+x,o-r'],

  // Several arguments
  ['o+xr', 'o+x', 'o+r'],
  ['o+x', 'o+x', 'o+r'],
]

module.exports = {
  CONTAINS_DATA,
}
