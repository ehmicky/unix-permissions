import { convert } from '../../../src/main.js'
import { isValid } from '../valid.js'

import { PARSE_DATA } from './parse/main.js'

const getConvertData = function() {
  return Object.keys(convert)
    .flatMap(otherType => PARSE_DATA.map(args => ({ ...args, otherType })))
    .filter(isValid)
    .filter(isConvertible)
}

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

export const CONVERT_DATA = getConvertData()
