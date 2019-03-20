// Ignore this file, this is only needed for internal purposes.
// We mock `require()` that examples look the same as if the library was
// directly installed.

// eslint-disable-next-line filenames/match-exported
'use strict'

const { name } = require('../package')

const mockedRequire = function(moduleName, ...args) {
  // istanbul ignore next
  const moduleNameA = moduleName === name ? `${__dirname}/..` : moduleName
  // eslint-disable-next-line import/no-dynamic-require
  return require(moduleNameA, ...args)
}

module.exports = mockedRequire
