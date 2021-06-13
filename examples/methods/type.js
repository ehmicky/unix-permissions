// Demo of the `type()` method in JavaScript.
// This file can be directly run:
//   - first install `unix-permissions`
//   - then `node node_modules/unix-permissions/examples/methods/type.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/unix-permissions

// eslint-disable-next-line node/no-missing-import
import { type } from 'unix-permissions'

console.log(type('1')) // 'octal'

console.log(type(1)) // 'number'

console.log(type('a+x')) // 'symbolic'

console.log(type('a+i')) // 'invalid'
