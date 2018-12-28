'use strict'

const { exit } = require('process')

const unixPermissions = require('..')

const { defineCli } = require('./top')
const { parseConfig } = require('./parse')

// Parse CLI arguments then run tasks
const runCli = async function() {
  try {
    const yargs = defineCli()
    const { command, args } = parseConfig({ yargs })
    const commandA = getCommand({ command })
    const output = await commandA(...args)
    handleOutput({ output })
  } catch (error) {
    runCliHandler(error)
  }
}

const getCommand = function({ command }) {
  return unixPermissions.convert[command] || unixPermissions[command]
}

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

// If an error is thrown, print error's description, then exit with exit code 1
const runCliHandler = function({ message }) {
  // eslint-disable-next-line no-console, no-restricted-globals
  console.error(message)

  exit(1)
}

module.exports = {
  runCli,
}
