import { convert } from '../../../src/main.js'

import { SIMPLE_DATA } from './simple.js'

const getSerializeData = function() {
  const types = Object.keys(convert)
  return SIMPLE_DATA.flatMap(arg => types.map(type => ({ type, arg })))
}

export const SERIALIZE_DATA = getSerializeData()
