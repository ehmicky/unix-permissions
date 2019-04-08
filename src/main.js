// We memoize all exported functions since they:
//  - are all pure and can be
//  - can be a little CPU-intensive
//  - should not be run with too many different inputs, i.e. memoization should
//    not consume too much memory
import { moizeFuncs } from './moize.js'

module.exports = moizeFuncs({
  ...require('./type.js'),
  ...require('./converters.js'),
  ...require('./functions.js'),
})
