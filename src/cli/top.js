/* eslint-disable max-lines */
'use strict'

const yargs = require('yargs')

const defineCli = function() {
  return yargs
    .options(CONFIG)
    .usage(USAGE)
    .example(MAIN_EXAMPLE, 'Validate and normalize a file path')
    .help()
    .version()
    .strict()
}

const CONFIG = {
  'default-value': {
    string: true,
    describe: 'Path default value',
    group: 'Normalization:',
  },
  base: {
    string: true,
    alias: 'b',
    requiresArg: true,
    describe: `Base directory to resolve relative paths.
Defaults to current directory.`,
    group: 'Normalization:',
  },
  platform: {
    string: true,
    requiresArg: true,
    describe: `Target OS ("unix" or "windows"), used to determine path delimiters.
Defaults to current OS.`,
    group: 'Normalization:',
  },
  'follow-symlinks': {
    boolean: true,
    describe: `Resolve symbolic links.
Defaults to false.`,
  },

  inside: {
    boolean: true,
    alias: 'i',
    describe: `Validate that the path is inside of its base directory or not.
Defaults to undefined.`,
    group: 'Validation:',
  },
  lowercase: {
    boolean: true,
    alias: 'l',
    describe: `Validate that the path is lowercase.
Defaults to false.`,
    group: 'Validation:',
  },
  'path-filter': {
    string: true,
    requiresArg: true,
    alias: 'p',
    describe: 'Validate that the path matches a regular expression',
    group: 'Validation:',
  },
  'filename-filter': {
    string: true,
    requiresArg: true,
    alias: 'f',
    describe: 'Validate that the filename matches a regular expression',
    group: 'Validation:',
  },
  exist: {
    boolean: true,
    alias: 'e',
    describe: `Validate that the file exists or does not exist.
Defaults to undefined.`,
    group: 'Validation:',
  },
  dir: {
    boolean: true,
    alias: 'd',
    describe: `Validate that the file is a directory or not.
Defaults to undefined.`,
    group: 'Validation:',
  },
  'allow-special': {
    boolean: true,
    alias: 's',
    describe: `Allow files that are special like sockets, FIFOs, block devices and character devices.
Defaults to false.`,
    group: 'Validation:',
  },
  'can-create': {
    boolean: true,
    alias: 'c',
    describe: `Validates that the file can be created if it does not exist.
Defaults to undefined.`,
    group: 'Validation:',
  },
  'can-read': {
    boolean: true,
    alias: 'r',
    describe: `Validates that the file can be read.
Defaults to undefined.`,
    group: 'Validation:',
  },
  'can-write': {
    boolean: true,
    alias: 'w',
    describe: `Validates that the file can be written to.
Defaults to undefined.`,
    group: 'Validation:',
  },
  'can-execute': {
    boolean: true,
    alias: 'x',
    describe: `Validates that the file can be executed.
Defaults to undefined.`,
    group: 'Validation:',
  },
}

const USAGE = `$0 [OPTS] PATH

File path validation and normalization.`

const MAIN_EXAMPLE = '$0'

module.exports = {
  defineCli,
}
/* eslint-enable max-lines */
