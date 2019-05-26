import { VALID_PARSE_DATA } from './parse/main.js'
import { TYPES } from './types.js'

export const CONVERT_DATA = VALID_PARSE_DATA.flatMap(({ arg, type }) =>
  TYPES.map(otherType => ({ arg, type, otherType })),
)
