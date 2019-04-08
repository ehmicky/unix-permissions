const { forEachType } = require('./repeat')
const { PARSE_DATA } = require('./parse')

const CONVERT_DATA = forEachType(PARSE_DATA)

module.exports = {
  CONVERT_DATA,
}
