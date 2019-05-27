import execa from 'execa'

const BINARY_PATH = `${__dirname}/../../src/bin/main.js`

// Call CLI command `unix-permissions COMMAND ...ARGS` and return output
export const callCli = async function(command, ...args) {
  const argsA = args.map(stringifyCliArg)

  const { stdout, stderr, code } = await execa(
    BINARY_PATH,
    [command, ...argsA],
    { reject: false },
  )

  // Replace `--help` message, as it's likely to change
  const stderrA = stderr.replace(/^main.js[^]*/u, 'Help message')

  return { code, stdout, stderr: stderrA }
}

const stringifyCliArg = function(arg) {
  // CLI interprets all numbers as `octal` not `number`
  if (typeof arg === 'number') {
    // eslint-disable-next-line no-magic-numbers
    return arg.toString(8)
  }

  // `object` arguments must be JSON in CLI
  if (arg && arg.constructor === Object) {
    return JSON.stringify(arg)
  }

  return arg
}
