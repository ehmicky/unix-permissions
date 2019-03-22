// Demo of the `invert()` method in JavaScript.
// This file can be directly run:
//   - first install `unix-permissions`
//   - then `node node_modules/unix-permissions/examples/methods/invert.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/unix-permissions

'use strict'

// Ignore the following line: this is only needed for internal purposes.
// eslint-disable-next-line import/no-unassigned-import
require('../utils')

const { invert } = require('unix-permissions')

console.log(invert('u+xs')) // 'u-x'

console.log(invert('u-xs')) // 'u+x'

console.log(invert('u=x')) // 'u+rw,u-x'

console.log(invert('a=x')) // 'a+rw,a-x'

console.log(invert('rws-ws-w-')) // '---r--r-x'

console.log(invert('0660')) // '0117'

console.log(invert('1660')) // '0117'
