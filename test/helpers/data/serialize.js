'use strict'

const { forEachType } = require('./types')

const SERIALIZE_DATA = forEachType([
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

  // Special permission
  'o+t',
  'o+tx',
  'g+s',
  'g+sx',
  'u+s',
  'u+sx',

  // Extremes
  '+',
  'a=rwxst',

  // Combining
  'o+xw',
  'a+x',
  'og+x',
  'o+x,g+w',

  // Operators
  'o-x',
  'a=x',
])

module.exports = {
  SERIALIZE_DATA,
}
