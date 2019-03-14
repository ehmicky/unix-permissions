'use strict'

const { readdirSync } = require('fs')
const { normalize } = require('path')

const execa = require('execa')
const test = require('ava')
const findUp = require('find-up')

// TODO: handle when file is not meant to be executed (no permission,
// or no shabang)
// TODO: handle when interpreter command is missing
// TODO: add convert.cmd
// TODO: recursive search on `example` directory.
// TODO: use `package.json` `directories.examples` folder first if defined.
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
const testExamples = function(addTest, { dir = getDefaultDir() } = {}) {
  // This must be synchronous because most test runners do not allow adding new
  // tests asynchronously.
  // This will throw if the directory does not exist
  const filenames = readdirSync(dir)

  const testData = filenames.map(filename => getTestData({ filename, dir }))
  testData.forEach(addTest)
}

const getDefaultDir = function() {
  // Must be synchronous. See above.
  const dir = findUp.sync(DEFAULT_DIRS)

  if (dir === null) {
    throw new Error("Could not find any 'examples' nor 'example' directory")
  }

  return dir
}

const DEFAULT_DIRS = ['examples', 'example']

const getTestData = function({ filename, dir }) {
  const path = normalize(`${dir}/${filename}`)
  const run = runCommand.bind(null, { path })
  return { filename, path, run }
}

const runCommand = async function({ path }) {
  // We require example files to be directly executable, i.e. using a shabang
  // instead of speciying the interpreter on the command line.
  // This is because:
  //  - examples should be simple to run without prior knowledge
  //  - it allows supporting any programming language
  const { code, stdout, stderr } = await execa(path, { reject: false })
  return { code, stdout, stderr }
}

const addAvaTest = function({ filename, run }) {
  test(`Example file '${filename}' output should be correct`, t =>
    runAvaTest({ t, run }))
}

const runAvaTest = async function({ t, run }) {
  const { code, stdout, stderr } = await run()
  t.snapshot({ code, stdout, stderr })
}

const avaTestExamples = testExamples.bind(null, addAvaTest)

avaTestExamples()
