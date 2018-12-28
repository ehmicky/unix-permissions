'use strict'

const { exit } = require('process')

// Print stringified output.
// For test functions like `contains()`, we use exit code 0|1 instead.
const handleOutput = function({ output }) {
  if (output === true) {
    exit()
  }

  if (output === false) {
    exit(1)
  }

  const outputA = typeof output === 'string' ? output : JSON.stringify(output)

  // eslint-disable-next-line no-console, no-restricted-globals
  console.log(outputA)
}

module.exports = {
  handleOutput,
}
