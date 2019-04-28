// Demo of the `normalize()` method in JavaScript.
// This file can be directly run:
//   - first install `unix-permissions`
//   - then `node node_modules/unix-permissions/examples/methods/normalize.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/unix-permissions

'use strict'

// Ignore the following line: this is only needed for internal purposes.
require('../utils.js')

const { normalize } = require('unix-permissions')

console.log(normalize('1')) // '0001'

console.log(normalize('g+x,o+x')) // 'go+x'

console.log(normalize('d--- --- ---')) // '---------'

console.log(normalize({ user: { read: undefined, write: true } }))
// { user: { write: true } }

try {
  normalize('z+x') // Throws an exception (permission syntax is invalid)
} catch (error) {
  console.log(error.message)
}
