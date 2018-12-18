'use strict'

const assert = require('assert')

const { omitBy } = require('../utils')

const parseConfig = function({ yargs }) {
  // eslint-disable-next-line id-length
  const { _: paths, ...config } = yargs.parse()

  assert(paths.length !== 0, 'Missing path argument')

  const configA = { ...config, paths }

  const configB = omitBy(configA, isInternalKey)
  return configB
}

// Remove `yargs`-specific options, shortcuts and dash-cased
const isInternalKey = function(key) {
  return INTERNAL_KEYS.includes(key) || key.length === 1 || key.includes('-')
}

const INTERNAL_KEYS = ['help', 'version', '_', '$0']

module.exports = {
  parseConfig,
}
