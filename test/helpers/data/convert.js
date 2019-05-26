import { VALID_PARSE_DATA } from './parse/main.js'
import { TYPES } from './types.js'

// Conversion between some types loses information
const isConvertible = function({ type, otherType }) {
  return LOSSY_CONVERSIONS.every(
    ([typeA, otherTypeA]) => typeA !== type || otherTypeA !== otherType,
  )
}

const LOSSY_CONVERSIONS = [
  ['symbolic', 'number'],
  ['symbolic', 'stat'],
  ['symbolic', 'octal'],
  ['object', 'number'],
  ['object', 'stat'],
  ['object', 'octal'],
  ['octal', 'number'],
  ['octal', 'stat'],
]

export const CONVERT_DATA = VALID_PARSE_DATA.flatMap(({ arg, type }) =>
  TYPES.map(otherType => ({ arg, type, otherType })),
).filter(isConvertible)
