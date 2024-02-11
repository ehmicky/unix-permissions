import { argv } from 'node:process'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { COMMANDS } from './commands.js'

export const defineCli = () =>
  yargs(hideBin(argv))
    .command(COMMANDS.map(getCommand))
    .demandCommand(1, 1)
    .recommendCommands()
    .usage(USAGE)
    .strict()
    // Permissions cannot be input as numbers, only as octals
    .parserConfiguration({ 'parse-numbers': false })
    .completion()

const COMMON_USAGE = `Unix permissions can take several types:
  - octal, e.g. "755"
  - same as stat output, e.g. "drwx-wx---"
  - symbolic, i.e. same as chmod input, e.g. "a=rw"`

const USAGE = `$0 COMMAND PERMISSIONS...

Convert, test and manipulate Unix permissions.

${COMMON_USAGE}`

const getCommand = ({ command, describe, examples }) => ({
  command,
  describe,
  builder: (commandYargs) =>
    commandYargs
      .usage(`$0 ${command}\n\n${describe}\n\n${COMMON_USAGE}`)
      .example(examples)
      .strict(),
})
