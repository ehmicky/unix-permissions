import { convert } from '../../../src/main.js'
import { isValid } from '../valid.js'

import { PARSE_DATA } from './parse/main.js'

const getConvertData = function() {
  return Object.keys(convert).flatMap(otherType =>
    PARSE_DATA.map(args => ({ ...args, otherType })),
  )
}

export const CONVERT_DATA = getConvertData()

export const VALID_CONVERT_DATA = CONVERT_DATA.filter(isValid)
