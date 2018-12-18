'use strict'

const { version } = require('process')
const { readFile, writeFile } = require('fs')
const { sep } = require('path')
const { platform } = require('os')

const promisify = require('util.promisify')
const isCi = require('is-ci')

const { getWatchTask } = require('../utils')
const gulpExeca = require('../exec')

const pReadFile = promisify(readFile)
const pWriteFile = promisify(writeFile)

const unit = async function() {
  if (!isCi) {
    return gulpExeca('ava')
  }

  await gulpExeca('nyc ava')

  // TODO: remove and link the two `gulpExeca` with &&
  await tempFix()

  const os = PLATFORMS[platform()]
  // `codecov` only allows restricted characters
  const nodeVersion = `node_${version.replace(/\./gu, '_')}`
  await gulpExeca(
    `curl -s https://codecov.io/bash > codecov && \
      bash codecov -f coverage/coverage-final.json -F ${os} -F ${nodeVersion} -Z && \
      rm codecov`,
  )
}

const PLATFORMS = {
  linux: 'linux',
  darwin: 'mac',
  win32: 'windows',
}

const tempFix = async function() {
  const lcov = await pReadFile('coverage/lcov.info', { encoding: 'utf-8' })

  const lcovA = lcov.replace(new RegExp(`localpack\\${sep}`, 'gu'), '')

  await pWriteFile('coverage/lcov.info', lcovA, { encoding: 'utf-8' })
}

// eslint-disable-next-line fp/no-mutation
unit.description = 'Run unit tests'

// We have to use this to debug Ava test files with Chrome devtools
const unitwatch = getWatchTask({ UNIT: unit }, unit)

// eslint-disable-next-line fp/no-mutation
unitwatch.description = 'Run unit tests in watch mode'

module.exports = {
  unit,
  unitwatch,
}
