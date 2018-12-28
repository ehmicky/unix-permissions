'use strict'

const parseConfig = function({ yargs }) {
  const {
    // eslint-disable-next-line id-length
    _: [command],
    permission,
    permissions = [],
  } = yargs.parse()

  // Retrieve all positional arguments, including none
  // We do not allow:
  //  - `number` permissions because they cannot be distinguished from `octal`
  //    permissions, which are more likely. I.e. we stringify those since yargs
  //    parse numbers automatically.
  //  - `object` permissions because they are not CLI-friendly
  const args = [permission, ...permissions].filter(isDefined).map(String)

  return { command, args }
}

const isDefined = function(value) {
  return value !== undefined
}

module.exports = {
  parseConfig,
}
