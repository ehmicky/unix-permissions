'use strict'

// We memoize all exported functions since they:
//  - are all pure and can be
//  - can be a little CPU-intensive
//  - should not be run with too many different inputs, i.e. memoization should
//    not consume too much memory
const { moizeFuncs } = require('./moize')

module.exports = moizeFuncs({
  ...require('./type'),
  ...require('./converters'),
  ...require('./functions'),
  ...require('./select'),
})
