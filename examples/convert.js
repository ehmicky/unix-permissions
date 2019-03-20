#!/usr/bin/env node
// This example demonstrates the `convert()` command in JavaScript.
// This file can be directly run:
//   - first install `unix-permissions`
//   - then `node node_modules/unix-permissions/examples/convert.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/unix-permissions

'use strict'

// The following line is only needed for this example.
// You should use `require('unix-permissions')` instead.
const unixPermissions = require('../build/src')

const { convert, positive } = unixPermissions

console.log(convert.symbolic('111')) // 'a=x'

console.log(positive(convert.symbolic('111'))) // 'a+x'

console.log(convert.octal('o+x')) // '+0001'

console.log(convert.octal('o=x')) // '0001'
