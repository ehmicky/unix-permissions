import { NUMBER, INVALID_NUMBER } from './number.test.js'
import { OBJECT, INVALID_OBJECT } from './object.test.js'
import { OCTAL, INVALID_OCTAL } from './octal.test.js'
import { STAT, INVALID_STAT } from './stat.test.js'
import { SYMBOLIC, INVALID_SYMBOLIC } from './symbolic.test.js'

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
