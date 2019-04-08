const POSITIVE_DATA = [
  // Each permission
  'o=x',
  'o=w',
  'o=r',
  'g=x',
  'g=w',
  'g=r',
  'u=x',
  'u=w',
  'u=r',

  // Special permission
  'o=t',
  'o=tx',
  'g=s',
  'g=sx',
  'u=s',
  'u=sx',

  // Extremes
  '=',
  'a=rwx',
  'a=rwxst',

  // Combining
  'o=xw',
  'a=x',
  'og=x',
  'o=x,g=w',

  // Operators
  'o-x',
  'a+x',
]

module.exports = {
  POSITIVE_DATA,
}
