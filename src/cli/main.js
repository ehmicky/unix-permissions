'use strict'

const { exit } = require('process')

const unixPermissions = require('..')

const { defineCli } = require('./top')
const { parseConfig } = require('./parse')
const { getCommand } = require('./command')
const { handleOutput } = require('./output')

// Parse CLI arguments then run tasks
const runCli = async function() {
  try {
    const yargs = defineCli()
    const { command, args } = parseConfig({ yargs })
    const commandA = getCommand({ unixPermissions, command })
    const output = await commandA(...args)
    handleOutput({ output })
  } catch (error) {
    runCliHandler(error)
  }
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
