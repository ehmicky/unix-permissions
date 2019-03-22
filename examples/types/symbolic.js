// Demo of the `symbolic` permission type in JavaScript.
// This file can be directly run:
//   - first install `unix-permissions`
//   - then `node node_modules/unix-permissions/examples/types/symbolic.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/unix-permissions

'use strict'

// Ignore the following line: this is only needed for internal purposes.
// eslint-disable-next-line import/no-unassigned-import
require('../utils')

const { convert } = require('unix-permissions')

console.log(convert.octal('o+wx')) // '+0003'

console.log(convert.octal('o=wx')) // '0003'

console.log(convert.octal('o-wx')) // '-0003'

console.log(convert.octal('go+x')) // '+0011'

console.log(convert.octal('g+x,o+x')) // '+0011'

console.log(convert.octal('a+x')) // '+0111'

console.log(convert.octal('+x')) // '+0111'

console.log(convert.octal('a+s')) // '+6000'

console.log(convert.octal('o+')) // '+0000'
