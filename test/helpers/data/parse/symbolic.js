'use strict'

const symbolic = [
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
]

module.exports = {
  symbolic,
}
