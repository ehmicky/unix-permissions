#!/usr/bin/env node
import { dirname } from 'path'
import { exit } from 'process'
import { fileURLToPath } from 'url'

import { readPackageUpAsync } from 'read-pkg-up'
import UpdateNotifier from 'update-notifier'

import * as unixPermissions from '../main.js'

import { getCommand } from './command.js'
import { handleOutput } from './output.js'
import { parseConfig } from './parse.js'
import { defineCli } from './top.js'

// Parse CLI arguments then run tasks
const runCli = async function () {
  try {
    await checkUpdate()

    const yargs = defineCli()
    const { command, args } = parseConfig({ yargs })
    const commandA = getCommand({ unixPermissions, command })
    const output = await commandA(...args)
    handleOutput({ output })
  } catch (error) {
    runCliHandler(error)
  }
}

// TODO: use static JSON imports once those are possible
const checkUpdate = async function () {
  const cwd = dirname(fileURLToPath(import.meta.url))
  const { packageJson } = await readPackageUpAsync({ cwd, normalize: false })
  UpdateNotifier({ pkg: packageJson }).notify()
}

// If an error is thrown, print error's description, then exit with exit code 1
const runCliHandler = function ({ message }) {
  console.error(message)

  exit(1)
}

runCli()
