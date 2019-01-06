'use strict'

// We prepend spaces to some arguments in order to escape them.
// Otherwise `yargs`:
//   - transtypes `octal` to `number`
//   - strips `+`
//   - fails parsing with `stat` and `symbolic` (like `-xr`)
const escapeArgs = function(args) {
  return args.map(escapeArg)
}

const escapeArg = function(arg) {
  if (shouldPrependSpace(arg)) {
    return ` ${arg}`
  }

  return arg
}

const shouldPrependSpace = function(arg) {
  return isOctal(arg) || arg.startsWith('+') || shouldEscapeMinus(arg)
}

const isOctal = function(arg) {
  return Number.isInteger(Number(arg))
}

const shouldEscapeMinus = function(arg) {
  return arg.startsWith('-') && !OPTIONS.includes(arg)
}

// Any valid CLI flag must be present there
const OPTIONS = ['--help', '--version']

module.exports = {
  escapeArgs,
}
