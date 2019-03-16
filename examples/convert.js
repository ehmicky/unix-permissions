#!/usr/bin/env node
// This example demonstrates the `convert()` command in JavaScript.
// This file can be directly run:
//   - first install `unix-permissions`
//   - then `node node_modules/unix-permissions/examples/convert.js`

'use strict'

// The following line is only needed for this example.
// You should use `require('unix-permissions')` instead.
const unixPermissions = require('..')

const { convert, positive } = unixPermissions

const resultA = convert.symbolic('111') // 'a=x'
console.log(resultA)

const resultB = positive(convert.symbolic('111')) // 'a+x'
console.log(resultB)

const resultC = convert.octal('o+x') // '+0001'
console.log(resultC)

const resultD = convert.octal('o=x') // '0001'
console.log(resultD)
