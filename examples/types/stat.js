// Demo of the `stat` permission type in JavaScript.
// This file can be directly run:
//   - first install `unix-permissions`
//   - then `node node_modules/unix-permissions/examples/types/stat.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/unix-permissions

'use strict'

// Ignore the following line: this is only needed for internal purposes.
// eslint-disable-next-line import/no-unassigned-import
require('../utils')

const { convert } = require('unix-permissions')

console.log(convert.octal('--------x')) // '0001'

console.log(convert.octal('--x--x--x')) // '0111'

console.log(convert.octal('--------T')) // '1000'

console.log(convert.octal('--------t')) // '1001'

console.log(convert.octal('d--------x')) // '0001'

console.log(convert.octal('--x --x --x')) // '0111'

console.log(convert.octal('rwx --- ---')) // '0700'

console.log(convert.octal('xwr --- ---')) // '0700'
