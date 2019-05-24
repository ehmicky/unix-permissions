import { OCTAL, INVALID_OCTAL } from './octal.js'
import { NUMBER, INVALID_NUMBER } from './number.js'
import { STAT, INVALID_STAT } from './stat.js'
import { SYMBOLIC, INVALID_SYMBOLIC } from './symbolic.js'
import { OBJECT, INVALID_OBJECT } from './object.js'

export const VALID_PARSE_DATA = [
  ...OCTAL,
  ...NUMBER,
  ...STAT,
  ...SYMBOLIC,
  ...OBJECT,
]

const INVALID_PARSE_DATA = [
  ...INVALID_OCTAL,
  ...INVALID_NUMBER,
  ...INVALID_STAT,
  ...INVALID_SYMBOLIC,
  ...INVALID_OBJECT,
]

export const PARSE_DATA = [...INVALID_PARSE_DATA, ...VALID_PARSE_DATA]
