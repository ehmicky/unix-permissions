'use strict'

const parseConfig = function({ yargs }) {
  const {
    // eslint-disable-next-line id-length
    _: [command],
    permission,
    permissions = [],
  } = yargs.parse()

  const args = [permission, ...permissions].filter(Boolean).map(String)
  return { command, args }
}

module.exports = {
  parseConfig,
}
