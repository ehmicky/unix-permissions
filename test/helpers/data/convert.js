import { forEachType } from './repeat.js'
import { PARSE_DATA } from './parse.js'

const CONVERT_DATA = forEachType(PARSE_DATA)

module.exports = {
  CONVERT_DATA,
}
