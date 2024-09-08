import spawn from 'nano-spawn'
import { getBinPath } from 'get-bin-path'

const BINARY_PATH = getBinPath()

// Call CLI command `unix-permissions COMMAND ...ARGS` and return output
export const callCli = async (command, ...args) => {
  const argsA = args.map(stringifyCliArg)

  const [{ reason, value: { stdout, stderr, exitCode } = reason }] =
    await Promise.allSettled([
      spawn('node', [await BINARY_PATH, command, ...argsA]),
    ])

  const stderrA = stderr.replace(HELP_MESSAGE_REGEXP, 'Help message')

  return { exitCode, stdout, stderr: stderrA }
}

const stringifyCliArg = (arg) => {
  // CLI interprets all numbers as `octal` not `number`
  if (typeof arg === 'number') {
    // eslint-disable-next-line no-magic-numbers
    return arg.toString(8)
  }

  // `object` arguments must be JSON in CLI
  if (arg && arg.constructor === Object) {
    return JSON.stringify(arg)
  }

  return String(arg)
}

// `--help` message is likely to change
const HELP_MESSAGE_REGEXP = /[^]*Examples:[^]*/u
