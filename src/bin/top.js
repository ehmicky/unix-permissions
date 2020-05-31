import yargs from 'yargs'

import { COMMANDS } from './commands.js'

export const defineCli = function () {
  const yargsA = yargs
    .usage(USAGE)
    .strict()
    .demandCommand(1, 1)
    .recommendCommands()
    // Permissions cannot be input as numbers, only as octals
    .parserConfiguration({ 'parse-numbers': false })
  const yargsB = COMMANDS.reduce(addCommand, yargsA)
  const yargsC = yargsB.completion()
  return yargsC
}

const COMMON_USAGE = `Unix permissions can take several types:
  - octal, e.g. "755"
  - same as stat output, e.g. "drwx-wx---"
  - symbolic, i.e. same as chmod input, e.g. "a=rw"`

const USAGE = `$0 COMMAND PERMISSIONS...

Convert, test and manipulate Unix permissions.

${COMMON_USAGE}`

const addCommand = function (yargsA, { command, describe, examples }) {
  const builder = buildCommand.bind(undefined, { command, describe, examples })
  const yargsB = yargsA.command({ command, describe, builder })
  const yargsC = addExamples(yargsB, examples)
  return yargsC
}

const buildCommand = function ({ command, describe, examples }, yargsA) {
  const yargsB = yargsA
    .usage(`$0 ${command}\n\n${describe}\n\n${COMMON_USAGE}`)
    .strict()
  const yargsC = addExamples(yargsB, examples)
  return yargsC
}

const addExamples = function (yargsA, examples) {
  return examples.reduce(addExample, yargsA)
}

const addExample = function (yargsA, [example, exampleDescription]) {
  return yargsA.example(`$0 ${example}`, exampleDescription)
}
