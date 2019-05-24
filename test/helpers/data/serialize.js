import { convert } from '../../../src/main.js'

import { SIMPLE_DATA } from './simple.js'

const getSerializeData = function() {
  return Object.keys(convert).flatMap(type =>
    SIMPLE_DATA.map(arg => ({ type, arg })),
  )
}

export const SERIALIZE_DATA = getSerializeData()
