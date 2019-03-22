'use strict'

const { readdirSync } = require('fs')
const { extname, normalize } = require('path')
const { platform } = require('process')

const execa = require('execa')
const test = require('ava')

// TODO: handle when file is not meant to be executed (no permission,
// or no shabang)
// TODO: handle when interpreter command is missing
// TODO: add convert.cmd
// TODO: recursive search on `example` directory.
// TODO: use `package.json` `directories.examples` directory first if defined.
// TODO: think of a better way for main require():
//   - `require('unix-permissions') in JavaScript
//   - `unix-permissions` in CLI
//   - so that it works not just with my own build tasks but also others
// TODO: replace `unix-permissions` in Bash (`gulp build`) using `package.json`
// `bin` field
// TODO: replace `unix-permissions` in JavaScript (`gulp build`) using
// `package.json` `name` field
// TODO: add other commands
// TODO: abstract into own package `test-examples`.
// Potential catchphrase `example-driven testing`
// TODO: should work in browsers for test runners that do.
const testExamples = function(addTest, dirs) {
  dirs.forEach(dir => testExamplesDir(addTest, dir))
}

const testExamplesDir = function(addTest, dir) {
  // This must be synchronous because most test runners do not allow adding new
  // tests asynchronously.
  // This will throw if the directory does not exist
  const filenames = readdirSync(dir)

  const testData = filenames
    .map(filename => getTestData({ filename, dir }))
    .filter(Boolean)
  testData.forEach(addTest)
}

const getTestData = function({ filename, dir }) {
  const extension = extname(filename)
  const { command, unixOnly } = EXTENSIONS[extension] || {}

  if (command === undefined || (unixOnly && platform === 'win32')) {
    return
  }

  const name = getTestName({ filename })

  const path = normalize(`${dir}/${filename}`)
  const run = runCommand.bind(null, { command, path })
  return { name, run }
}

const EXTENSIONS = {
  '.js': { command: 'node' },
  '.sh': { command: 'bash', unixOnly: true },
}

const getTestName = function({ filename }) {
  return `Example file '${filename}' output should be correct`
}

const runCommand = async function({ command, path }) {
  const { code, stdout, stderr } = await execa(command, [path], {
    reject: false,
  })
  return { code, stdout, stderr }
}

const addAvaTest = function({ name, run }) {
  test(name, async t => {
    const result = await run()
    t.snapshot(result)
  })
}

const avaTestExamples = testExamples.bind(null, addAvaTest)

avaTestExamples(['examples/types', 'examples/methods'])
