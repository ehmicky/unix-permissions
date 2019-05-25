import { convert } from '../../../src/main.js'

import { SIMPLE_DATA } from './simple.js'

const types = Object.keys(convert)

export const SERIALIZE_DATA = SIMPLE_DATA.flatMap(arg =>
  types.map(type => ({ type, arg })),
)
