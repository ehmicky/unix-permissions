'use strict'

const parseConfig = function({ yargs }) {
  // eslint-disable-next-line id-length
  const { _: command, permission, permissions = [] } = yargs.parse()

  const args = [permission, ...permissions].filter(Boolean).map(String)
  return { command, args }
}

module.exports = {
  parseConfig,
}
