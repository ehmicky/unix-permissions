'use strict'

const { exit } = require('process')

const validatePath = require('../convert')

const { defineCli } = require('./top')
const { parseConfig } = require('./parse')

// Parse CLI arguments then run tasks
const runCli = async function() {
  try {
    const yargs = defineCli()
    const { paths, ...config } = parseConfig({ yargs })
    const pathsA = await validatePath(paths, config)
    // eslint-disable-next-line no-console, no-restricted-globals
    console.log(pathsA.join('\n'))
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
