'use strict'

const yargs = require('yargs')

const COMMANDS = require('./commands')

const defineCli = function() {
  const yargsA = yargs.usage(USAGE).strict()
  const yargsB = COMMANDS.reduce(addCommand, yargsA)
  return yargsB
}

const USAGE = `$0 COMMAND PERMISSIONS...

Convert, test and manipulate Unix permissions.`

const addCommand = function(yargsA, { command, describe, examples }) {
  const builder = buildCommand.bind(null, { command, describe, examples })
  const yargsB = yargsA.command({ command, describe, builder })
  const yargsC = addExamples(yargsB, examples)
  return yargsC
}

const buildCommand = function({ command, describe, examples }, yargsA) {
  const yargsB = yargsA.usage(`$0 ${command}\n\n${describe}`).strict()
  const yargsC = addExamples(yargsB, examples)
  return yargsC
}

const addExamples = function(yargsA, examples) {
  return examples.reduce(addExample, yargsA)
}

const addExample = function(yargsA, [example, exampleDescription]) {
  return yargsA.example(`$0 ${example}`, `Output: ${exampleDescription}`)
}

module.exports = {
  defineCli,
}
