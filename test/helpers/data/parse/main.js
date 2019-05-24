import { normalize } from '../../../../src/main.js'

import { OCTAL } from './octal.js'
import { NUMBER } from './number.js'
import { STAT } from './stat.js'
import { SYMBOLIC } from './symbolic.js'
import { OBJECT } from './object.js'

export const PARSE_DATA = [
  ...OCTAL,
  ...NUMBER,
  ...STAT,
  ...SYMBOLIC,
  ...OBJECT,
]

export const isValid = function({ arg }) {
  try {
    normalize(arg)
    return true
  } catch {
    return false
  }
}

export const VALID_PARSE_DATA = PARSE_DATA.filter(isValid)
