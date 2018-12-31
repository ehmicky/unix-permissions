'use strict'

const EQUAL_DATA = [
  // Invalid
  ['o+x'],
  [],

  // Normal permissions
  ['o=xr', 'o=xr'],
  ['o=xr', 'o=x'],
  ['a=xr', 'a=xr'],
  ['a=xr', 'a=x'],

  // Special permission
  ['o+t', 'o+t'],
  ['o+t', 'o+'],
  ['o+t', 'o-t'],
  ['g+s', 'g+s'],
  ['g+s', 'g+'],
  ['g+s', 'g-s'],
  ['u+s', 'u+s'],
  ['u+s', 'u+'],
  ['u+s', 'u-s'],

  // Extremes
  ['+', '+'],
  ['+', 'o+x'],
  ['a=rwx', 'a=rwx'],
  ['a=rwx', 'a=rw'],
  ['a=rwxst', 'a=rwxst'],
  ['a=rwxst', 'a=rwx'],

  // Combining
  ['o+xw', 'o+x,o+w'],
  ['o+xw', 'o+x'],
  ['a+x', 'o+x,g+x,u+x'],
  ['a+x', 'o+x,g+x'],
  ['og+x', 'o+x,g+x'],
  ['og+x', 'o+x'],
  ['o+x,o-r', 'o-r,o+x'],
  ['o+x,o-r', 'o+r,o+x'],
  ['o+x', 'o+x,o+x'],
  ['o+x', 'o+x,o+r'],

  // Operators
  ['o+x', 'o+x'],
  ['o+x', 'o+xr'],
  ['u+x', 'o-w'],
  ['o-x', 'o-x'],
  ['o-x', 'o-xr'],

  // Several arguments
  ['o+xr', 'o+x,o+r', 'o+r,o+x'],
  ['o+xr', 'o+x,o+r', 'o+r'],
]

module.exports = {
  EQUAL_DATA,
}
