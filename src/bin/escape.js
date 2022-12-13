// We prepend spaces to arguments starting with `-` in order to escape them.
// Otherwise `yargs` fails parsing with `stat` and `symbolic` (like `-xr`)
export const escapeArgs = (args) => args.map(escapeArg)

const escapeArg = (arg) => {
  if (shouldEscapeMinus(arg)) {
    return ` ${arg}`
  }

  return arg
}

const shouldEscapeMinus = (arg) => arg.startsWith('-') && !OPTIONS.has(arg)

// Any valid CLI flag must be present there
const OPTIONS = new Set(['--help', '--version'])
