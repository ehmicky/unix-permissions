import { SIMPLE_DATA } from './simple.js'
import { TYPES } from './types.js'

export const SERIALIZE_DATA = SIMPLE_DATA.flatMap(arg =>
  TYPES.map(type => ({ type, arg })),
)
