import { convert } from '../../../src/main.js'

import { SIMPLE_DATA } from './simple.js'

const getSerializeData = function() {
  return SIMPLE_DATA.flatMap(arg =>
    Object.keys(convert).map(type => ({ type, arg })),
  )
}

export const SERIALIZE_DATA = getSerializeData()
