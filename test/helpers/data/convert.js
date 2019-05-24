import { convert } from '../../../src/main.js'

import { PARSE_DATA } from './parse/main.js'

const getConvertData = function() {
  return Object.keys(convert).flatMap(otherType =>
    PARSE_DATA.map(args => ({ ...args, otherType })),
  )
}

export const CONVERT_DATA = getConvertData()
