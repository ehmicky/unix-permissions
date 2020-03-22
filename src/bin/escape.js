// We prepend spaces to arguments starting with `-` in order to escape them.
// Otherwise `yargs` fails parsing with `stat` and `symbolic` (like `-xr`)
export const escapeArgs = function (args) {
  return args.map(escapeArg)
}

const escapeArg = function (arg) {
  if (shouldEscapeMinus(arg)) {
    return ` ${arg}`
  }

  return arg
}

const shouldEscapeMinus = function (arg) {
  return arg.startsWith('-') && !OPTIONS.includes(arg)
}

// Any valid CLI flag must be present there
const OPTIONS = ['--help', '--version']
