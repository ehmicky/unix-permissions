'use strict'

const { testCli } = require('./cli')

// Snapshot a command's output, then test it has the same behavior when fired
// from CLI.
const testCommand = async function({ t, func, command, args }) {
  const { output, error } = fireCommand({ func, args })

  t.snapshot({ output, error })

  await testCli({ t, output, error, command, args })
}

// Fire command programmatically
const fireCommand = function({ func, args }) {
  try {
    const output = func(...args)
    return { output, error: false }
  } catch (error) {
    const output = error.message
    return { output, error: true }
  }
}

module.exports = {
  testCommand,
}
