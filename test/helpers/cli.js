import execa from 'execa'

const BINARY_PATH = `${__dirname}/../../src/bin/main.js`

// Test that CLI output and exit code is same as programmatic output and
// exception throwing
export const testCli = async function({ t, command, args }) {
  if (args.some(isInvalidCliArg)) {
    return
  }

  const { stdout, stderr, code } = await fireBinary({ command, args })

  // Replace `--help` message, as it's likely to change
  const stderrA = stderr.replace(/^main.js[^]*/u, 'Help message')

  t.snapshot({ code, stdout, stderr: stderrA })
}

// CLI interprets all numbers as `octal` not `number`
const isInvalidCliArg = function(arg) {
  return typeof arg === 'number'
}

// Fire CLI command
const fireBinary = function({ command, args }) {
  const argsA = args.map(stringifyCliArg)
  return execa(BINARY_PATH, [command, ...argsA], { reject: false })
}

// Stringify CLI arguments so they can be passed to `childProcess.spawn()`
const stringifyCliArg = function(arg) {
  if (arg && arg.constructor === Object) {
    return JSON.stringify(arg)
  }

  return arg
}
