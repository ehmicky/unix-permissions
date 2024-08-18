# Permission types

You can use any of the following permission types as input. You can also
[`convert()`](API.md#convertoctalnumberstatsymbolicobjectpermission) between
them.

## octal

Permission type used by [`chmod`](https://linux.die.net/man/1/chmod).

Octal string where each digit represents a user class: `user`, `group` and
`others`. Each digit's is a [bitfield](https://en.wikipedia.org/wiki/Bit_field)
representing `read`, `write` and `execute`. Special permissions
([setuid](https://en.wikipedia.org/wiki/Setuid),
[setgid](https://en.wikipedia.org/wiki/Setuid),
[sticky](https://en.wikipedia.org/wiki/Sticky_bit)) can optionally be specified
by prepending another digit.

An operator can be prepended:

- `=` (default): unset omitted permissions
- `+`: leave omitted permissions as is
- `-`: unset specified permissions

```js
import { convert } from 'unix-permissions'

console.log(convert.stat('720')) // 'rwx-w----'
console.log(convert.stat('7000')) // '--S--S--T'
console.log(convert.stat('\\720')) // 'rwx-w----'
console.log(convert.stat('0720')) // 'rwx-w----'
console.log(convert.stat('0o720')) // 'rwx-w----'
console.log(convert.symbolic('+720')) // 'u+rwx,g+w'
console.log(convert.symbolic('-720')) // 'u-rwx,g-w'
console.log(convert.symbolic('=720')) // 'u=rwx,g=w,o='
```

## number

Permission type used by Node.js
[`fs.chmod()`](https://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback).

It is the same as `octal` except:

- as a decimal number.
- no operator can be used.
- it can be used as input in [JavaScript](../README.md#usage-javascript) but not
  on the [command line](../README.md#usage-cli), where all numbers should be in
  [`octal`](#octal) form instead.

```js
import { convert } from 'unix-permissions'

console.log(convert.stat(0)) // '---------'
console.log(convert.stat(1)) // '--------x'
console.log(convert.stat(3)) // '-------wx'
console.log(convert.stat(8)) // '-----x---'
console.log(convert.stat(512)) // '--------T'
```

## stat

Permission type used by [`stat`](https://linux.die.net/man/2/stat) and
[`ls`](https://linux.die.net/man/1/ls).

It is a string where each character represents either the permission (`r`, `w`,
`x`) or no permission (`-`). The special permission are indicated with `S`, `s`,
`T` and `t` where lowercase implies `x` is also present.

Optionally a first character can be specified to indicate the file type (e.g.
`d` for directories).

```js
import { convert } from 'unix-permissions'

console.log(convert.octal('--------x')) // '0001'
console.log(convert.octal('--x--x--x')) // '0111'
console.log(convert.octal('--------T')) // '1000'
console.log(convert.octal('--------t')) // '1001'
console.log(convert.octal('d--------x')) // '0001'
console.log(convert.octal('--x --x --x')) // '0111'
console.log(convert.octal('rwx --- ---')) // '0700'
console.log(convert.octal('xwr --- ---')) // '0700'
```

## symbolic

Permission type used by [`chmod`](https://linux.die.net/man/1/chmod) as a string
like `gu+rx`.

Starts with the user class (`a` for all, `u` for user, `g` for group, `o` for
others) then the operator (`+`, `-` or `=`) and ends with the permissions
characters.

While `+` leaves the omitted permissions as is, `=` unsets them. For example
`o=x` is the same as combining `o+x` and `o-rwt`.

Several groups can be specified using a comma-separated list like `g+x,o+r`.

User classes can be concatenated like `go+x`.

```js
import { convert } from 'unix-permissions'

console.log(convert.octal('o+wx')) // '+0003'
console.log(convert.octal('o=wx')) // '0003'
console.log(convert.octal('o-wx')) // '-0003'
console.log(convert.octal('go+x')) // '+0011'
console.log(convert.octal('g+x,o+x')) // '+0011'
console.log(convert.octal('a+x')) // '+0111'
console.log(convert.octal('+x')) // '+0111'
console.log(convert.octal('a+s')) // '+6000'
console.log(convert.octal('o+')) // '+0000'
```

## object

Permission type as an object such as `{ user: { read: true, write: false } }`.

The full syntax is:

```json
{
  "user": { "read": true, "write": true, "execute": true },
  "group": { "read": true, "write": true, "execute": true },
  "others": { "read": true, "write": true, "execute": true },
  "special": { "setuid": true, "setgid": true, "sticky": true }
}
```

The values can be `true`, `false` or `undefined`. `undefined` leaves permissions
as is while `false` unsets them.

```js
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
```

On the command line:

```bash
unix-permissions convert.symbolic '{ "all": { "read": true } }' # a+r
```
