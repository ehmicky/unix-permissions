#!/usr/bin/env node
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import handleCliError from 'handle-cli-error'
import { readPackageUp } from 'read-package-up'
import updateNotifier from 'update-notifier'

import * as unixPermissions from '../main.js'

import { getCommand } from './command.js'
import { handleOutput } from './output.js'
import { parseConfig } from './parse.js'
import { defineCli } from './top.js'

// Parse CLI arguments then run tasks
const runCli = async () => {
  try {
    await checkUpdate()

    const yargs = defineCli()
    const { command, args } = parseConfig({ yargs })
    const commandA = getCommand({ unixPermissions, command })
    const output = await commandA(...args)
    handleOutput({ output })
  } catch (error) {
    handleCliError(error, { stack: false })
  }
}

// TODO: use static JSON imports once those are possible
const checkUpdate = async () => {
  const cwd = dirname(fileURLToPath(import.meta.url))
  const { packageJson } = await readPackageUp({ cwd, normalize: false })
  updateNotifier({ pkg: packageJson }).notify()
}

await runCli()
