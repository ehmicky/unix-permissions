// Demo of the `octal` permission type in JavaScript.
// This file can be directly run:
//   - first install `unix-permissions`
//   - then `node node_modules/unix-permissions/examples/octal.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/unix-permissions

'use strict'

// Ignore the following line: this is only needed for internal purposes.
// eslint-disable-next-line import/no-unassigned-import
require('../utils')

const { convert } = require('unix-permissions')

console.log(convert.stat('720')) // 'rwx-w----'

console.log(convert.stat('7000')) // '--S--S--T'

console.log(convert.stat('\\720')) // 'rwx-w----'

console.log(convert.stat('0720')) // 'rwx-w----'

console.log(convert.stat('0o720')) // 'rwx-w----'

console.log(convert.symbolic('+720')) // 'u+rwx,g+w'

console.log(convert.symbolic('-720')) // 'u-rwx,g-w'

console.log(convert.symbolic('=720')) // 'u=rwx,g=w,o='
