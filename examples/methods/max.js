// Demo of the `max()` method in JavaScript.
// This file can be directly run:
//   - first install `unix-permissions`
//   - then `node node_modules/unix-permissions/examples/methods/max.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/unix-permissions

'use strict'

// Ignore the following line: this is only needed for internal purposes.
require('../utils')

const { max } = require('unix-permissions')

console.log(max('404', '440', '402')) // '0446'
