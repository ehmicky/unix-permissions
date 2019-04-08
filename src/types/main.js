import number from './number.js'
import octal from './octal.js'
import stat from './stat.js'
import symbolic from './symbolic.js'
import object from './object.js'

// Order is significant, because each is tried in order
const TYPES = [number, octal, stat, symbolic, object]

// Object keys are significant
const TYPES_MAP = { number, octal, stat, symbolic, object }

module.exports = {
  TYPES,
  TYPES_MAP,
}
