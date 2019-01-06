'use strict'

const { argv } = require('process')

const parseConfig = function({ yargs }) {
  const args = getArgs()

  const {
    // eslint-disable-next-line id-length
    _: [command],
    permission,
    permissions = [],
  } = yargs.parse(args)

  // Retrieve all positional arguments, including none
  // We do not allow:
  //  - `number` permissions because they cannot be distinguished from `octal`
  //    permissions, which are more likely. I.e. we stringify those since yargs
  //    parse numbers automatically.
  //  - `object` permissions because they are not CLI-friendly
  const argsA = [permission, ...permissions].filter(isDefined).map(String)

  return { command, args: argsA }
}

const getArgs = function() {
  return argv.slice(2).map(getArg)
}

const getArg = function(arg) {
  const argA = fixPlus({ arg })
  return argA
}

// `yargs` strips the `+` otherwise
const fixPlus = function({ arg }) {
  if (!arg.startsWith('+')) {
    return arg
  }

  return ` ${arg}`
}

const isDefined = function(value) {
  return value !== undefined
}

module.exports = {
  parseConfig,
}
