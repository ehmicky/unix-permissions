export const INVALID_SYMBOLIC = [
  // Invalid
  '',
  '   ',
  'abc',
  'z+x',
  'a~x',
  'a+j',
  'a+xx',
]

export const SYMBOLIC = [
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

  // No category
  '+',
  '-',
  '=',
  '+x',
  '-x',
  '=x',

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

  // Combining different categories and permissions
  'o+x,g-x',
  'o+x,o-r',
]
