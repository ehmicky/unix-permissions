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
    const output = await unixPermissions[command](...args)
    handleOutput({ output })
  } catch (error) {
    runCliHandler(error)
  }
}

const handleOutput = function({ output }) {
  if (output === true) {
    exit()
  }

  if (output === false) {
    exit(1)
  }

  // eslint-disable-next-line no-console, no-restricted-globals
  console.log(output)
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
