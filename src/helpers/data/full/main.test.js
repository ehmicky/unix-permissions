import { INVALID_NUMBER, NUMBER } from './number.test.js'
import { INVALID_OBJECT, OBJECT } from './object.test.js'
import { INVALID_OCTAL, OCTAL } from './octal.test.js'
import { INVALID_STAT, STAT } from './stat.test.js'
import { INVALID_SYMBOLIC, SYMBOLIC } from './symbolic.test.js'

export const VALID_FULL_DATA = [
  ...OCTAL,
  ...NUMBER,
  ...STAT,
  ...SYMBOLIC,
  ...OBJECT,
]

export const FULL_DATA = [
  ...INVALID_OCTAL,
  ...INVALID_NUMBER,
  ...INVALID_STAT,
  ...INVALID_SYMBOLIC,
  ...INVALID_OBJECT,

  ...VALID_FULL_DATA,
]
