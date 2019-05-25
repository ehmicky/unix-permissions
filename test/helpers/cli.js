import execa from 'execa'

const BINARY_PATH = `${__dirname}/../../src/bin/main.js`

// Test that CLI output and exit code is same as programmatic output and
// exception throwing
export const testCli = async function({ t, output, error, command, args }) {
  if (args.some(isInvalidCliArg)) {
    return
  }

  const { output: outputA, error: errorA } = normalizeOutput({ output, error })

  const { stdout, stderr, code } = await fireBinary({ command, args })

  if (hasArgLengthError({ stderr })) {
    return
  }

  checkNonError({ t, output: outputA, error: errorA, code, stdout, stderr })
  checkError({ t, output: outputA, error: errorA, code, stdout, stderr })

  t.snapshot({ code, stdout, stderr })
}

// CLI interprets all numbers as `octal` not `number`
const isInvalidCliArg = function(arg) {
  return typeof arg === 'number'
}

// Normalize programmatic output to make it comparable to CLI output
const normalizeOutput = function({ output, error }) {
  if (typeof output === 'boolean') {
    return { output: '', error: !output }
  }

  if (typeof output !== 'string') {
    return { output: JSON.stringify(output), error }
  }

  return { output, error }
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

// CLI is stricter than programmatic usage for arguments length
// validation. I.e. error message might differ there
const hasArgLengthError = function({ stderr }) {
  return stderr.includes(ARGS_LENGTH_ERROR)
}

const ARGS_LENGTH_ERROR = 'Not enough non-option arguments'

// Assertion checks if the error did not throw
const checkNonError = function({ t, output, error, code, stdout, stderr }) {
  if (error) {
    return
  }

  t.is(stderr, '')
  t.is(stdout, output)
  t.is(code, 0)
}

// Assertion checks if the error threw
const checkError = function({ t, output, error, code, stdout, stderr }) {
  if (!error) {
    return
  }

  t.is(stdout, '')
  t.is(fixOutput(stderr), fixOutput(output))
  t.is(code, 1)
}

// CLI sometimes appends things like whitespaces or `0`, so we can't compare
// the `permission` string and need to remove it for comparison.
const fixOutput = function(string) {
  return string.trim().replace(INVALID_PERM_REGEXP, INVALID_PERM)
}

const INVALID_PERM = 'Permissions syntax is invalid:'
const INVALID_PERM_REGEXP = new RegExp(`${INVALID_PERM}.*`, 'u')
