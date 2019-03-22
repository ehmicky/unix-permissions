// Demo of the `contain()` command in JavaScript.
// This file can be directly run:
//   - first install `unix-permissions`
//   - then `node node_modules/unix-permissions/examples/contain.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/unix-permissions

'use strict'

// Ignore the following line: this is only needed for internal purposes.
// eslint-disable-next-line import/no-unassigned-import
require('../utils')

const { contain } = require('unix-permissions')

console.log(contain('--x--x--x', 'a=x')) // `true`

console.log(contain('--x--x--x', 'a+x')) // `true`

console.log(contain('--x--x--x', 'a-x')) // `false`

console.log(contain('--x--x--x', 'a-w')) // `true`

console.log(contain('o+x', 'o+x')) // `true`

console.log(contain('o+x', 'o+x,o+x')) // `true`

console.log(contain('o+x', 'o=w')) // `false`

console.log(contain('o+x,o-w', 'o-w,o+x')) // `true`

console.log(contain('o+x,o-w', 'o-w')) // `true`

console.log(contain('o+x,o-w', 'o+x', 'o-w')) // `true`
