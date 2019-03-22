// Demo of the `type()` command in JavaScript.
// This file can be directly run:
//   - first install `unix-permissions`
//   - then `node node_modules/unix-permissions/examples/type.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/unix-permissions

'use strict'

// Ignore the following line: this is only needed for internal purposes.
// eslint-disable-next-line import/no-unassigned-import
require('../utils')

const { type } = require('unix-permissions')

console.log(type('1')) // 'octal'

console.log(type(1)) // 'number'

console.log(type('a+x')) // 'symbolic'

console.log(type('a+i')) // 'invalid'
