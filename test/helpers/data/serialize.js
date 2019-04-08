import { forEachType } from './repeat.js'
import { SIMPLE_DATA } from './simple.js'

const SERIALIZE_DATA = forEachType(SIMPLE_DATA)

module.exports = {
  SERIALIZE_DATA,
}
