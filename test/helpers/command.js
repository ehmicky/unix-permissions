// eslint-disable-next-line ava/no-ignored-test-files
'use strict'

const test = require('ava')

const unixPermissions = require('../../src')
// eslint-disable-next-line import/no-internal-modules
const { getCommand } = require('../../src/bin/command')

const { testCli } = require('./cli')

const performTests = function({ data, title, command }) {
  data.forEach(datum => performTest({ datum, title, command }))
}

const performTest = function({ datum, title, command }) {
  const titleA = title(datum)
  test(titleA, t => testCommand({ datum, command, t }))
}

// Snapshot a command's output, then test it has the same behavior when fired
// from CLI.
const testCommand = async function({ datum, command, t }) {
  const commandA = typeof command === 'function' ? command(datum) : command
  const args = getArgs({ datum })

  const { output, error } = fireCommand({ command: commandA, args })

  t.snapshot({ output, error })

  await testCli({ t, output, error, command: commandA, args })
}

const getArgs = function({ datum }) {
  if (Array.isArray(datum)) {
    return datum
  }

  if (typeof datum === 'object' && datum !== null) {
    return datum.args
  }

  return [datum]
}

// Fire command programmatically
const fireCommand = function({ command, args }) {
  const func = getCommand({ unixPermissions, command })

  try {
    const output = func(...args)
    return { output, error: false }
  } catch (error) {
    const output = error.message
    return { output, error: true }
  }
}

module.exports = {
  performTests,
}
