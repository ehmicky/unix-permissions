'use strict'

const parseConfig = function({ yargs }) {
  const {
    // eslint-disable-next-line id-length
    _: [command],
    permission,
    permissions = [],
  } = yargs.parse()

  const args = [permission, ...permissions].filter(isDefined).map(String)
  return { command, args }
}

const isDefined = function(value) {
  return value !== undefined
}

module.exports = {
  parseConfig,
}
