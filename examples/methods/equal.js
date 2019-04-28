// Demo of the `equal()` method in JavaScript.
// This file can be directly run:
//   - first install `unix-permissions`
//   - then `node node_modules/unix-permissions/examples/methods/equal.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/unix-permissions

'use strict'

// Ignore the following line: this is only needed for internal purposes.
require('../utils.js')

const { equal } = require('unix-permissions')

console.log(equal('--x--x--x', 'a=x')) // `true`

console.log(equal('--x--x--x', 'a+x')) // `false`

console.log(equal('--x--x--x', 'a-x')) // `false`

console.log(equal('--x--x--x', 'a-w')) // `false`

console.log(equal('o+x', 'o+x')) // `true`

console.log(equal('o+x', 'o+x,o+x')) // `true`

console.log(equal('o+x', 'o=w')) // `false`

console.log(equal('o+x,o-w', 'o-w,o+x')) // `true`

console.log(equal('o+x,o-w', 'o-w')) // `false`

console.log(equal('o+x,o-w', 'o+x', 'o-w')) // `false`
