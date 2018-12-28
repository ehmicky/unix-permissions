'use strict'

const execa = require('execa')

const BINARY_PATH = `${__dirname}/../../localpack/bin/unix_permissions.js`

// Test that CLI output and exit code is same as programmatic output and
// exception throwing
const testCli = async function({ t, output, error, command, args }) {
  if (!args.some(isValidCliArgument)) {
    return
  }

  const { stdout, stderr, code } = await fireBinary(command, ...args)

  checkNonError({ t, output, error, code, stdout, stderr })
  checkError({ t, output, error, code, stdout, stderr })
}

// Ignore argument if it is not parsable by CLI
const isValidCliArgument = function(arg) {
  return typeof arg === 'string' && arg.trim() !== ''
}

// Fire CLI command
const fireBinary = async function(command, ...args) {
  const argsA = args.map(escapeArg).join(' ')

  const { stdout, stderr, code } = await execa.shell(
    `${BINARY_PATH} ${command} ${argsA}`,
    { reject: false },
  )

  const stdoutA = stdout.trim()
  const stderrA = stderr.trim()
  return { stdout: stdoutA, stderr: stderrA, code }
}

const escapeArg = function(arg) {
  return String(arg).replace(/\s/gu, '\\$&')
}

// Assertion checks if the error did not throw
const checkNonError = function({ t, output, error, code, stdout, stderr }) {
  if (error) {
    return
  }

  t.is(code, 0)
  t.is(stdout, output)
  t.is(stderr, '')
}

// Assertion checks if the error threw
const checkError = function({ t, output, error, code, stdout, stderr }) {
  if (!error) {
    return
  }

  t.is(code, 1)
  t.is(stdout, '')
  t.is(stderr, output)
}

module.exports = {
  testCli,
}
