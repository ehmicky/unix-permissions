// Demo of the `object` permission type in JavaScript.
// This file can be directly run:
//   - first install `unix-permissions`
//   - then `node node_modules/unix-permissions/examples/types/object.js`
// An online demo is also available at:
//   https://repl.it/@ehmicky/unix-permissions

import { convert } from 'unix-permissions'

console.log(convert.symbolic({ others: { read: true, execute: true } }))
// 'o+rx'

console.log(convert.symbolic({ others: { read: true, execute: false } }))
// 'o+r,o-x'

console.log(convert.symbolic({ others: { read: true, execute: undefined } }))
// 'o+r'

console.log(convert.symbolic({ all: { read: true } }))
// 'a+r'

console.log(convert.symbolic({}))
// 'a+'

console.log(
  convert.symbolic({ special: { setuid: true, setgid: true, sticky: true } }),
)
// 'ug+s,o+t'
