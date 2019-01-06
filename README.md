[![downloads](https://img.shields.io/npm/dt/unix-permissions.svg?logo=npm)](https://www.npmjs.com/package/unix-permissions) [![last commit](https://img.shields.io/github/last-commit/ehmicky/unix-permissions.svg?logo=github&logoColor=white)](https://github.com/ehmicky/unix-permissions/graphs/contributors) [![license](https://img.shields.io/badge/license-Apache%202.0-4cc61e.svg?logo=github&logoColor=white)](https://www.apache.org/licenses/LICENSE-2.0) [![Coverage Status](https://img.shields.io/codecov/c/github/ehmicky/unix-permissions.svg?label=test%20coverage&logo=codecov)](https://codecov.io/gh/ehmicky/unix-permissions) [![travis](https://img.shields.io/travis/ehmicky/unix-permissions/master.svg?logo=travis)](https://travis-ci.org/ehmicky/unix-permissions/builds) [![npm](https://img.shields.io/npm/v/unix-permissions.svg?logo=npm)](https://www.npmjs.com/package/unix-permissions) [![node](https://img.shields.io/node/v/unix-permissions.svg?logo=node.js)](#) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?logo=javascript)](https://standardjs.com) [![eslint-config-standard-prettier-fp](https://img.shields.io/badge/eslint-config--standard--prettier--fp-4cc61e.svg?logo=eslint&logoColor=white)](https://github.com/ehmicky/eslint-config-standard-prettier-fp) [![Gitter](https://img.shields.io/gitter/room/ehmicky-code/unix-permissions.svg?logo=gitter)](https://gitter.im/ehmicky-code/unix-permissions)

[Unix file permissions](https://en.wikipedia.org/wiki/File_system_permissions)
can take several [types](#types). With
[`chmod`](https://linux.die.net/man/1/chmod) they
look like either [`ug+rw`](#symbolic) or [`660`](#octal), while with
[`stat`](https://linux.die.net/man/2/stat) and
[`ls`](https://linux.die.net/man/1/ls) they look like [`drw-rw----`](#stat).
This library enables using any of those [types](#types) (instead of being
limited to a single one) with any [Node.js](#examples-javascript) or
[CLI command](#examples-cli).

This library also allows you to perform operations on Unix permissions
including:

- [converting](#convertoctalpermission) Unix permissions between different
  [types](#types).
- [validating](#normalizepermission) syntax.
- [normalizing](#normalizepermission). For example `u+r,u+w` can be shortened
  to `u+rw`.
- [testing](#containpermission-permissions), e.g. "Is this executable by any
  users?"
- [setting](#setpermission-permissions) and
  [unsetting](#notpermission-permissions). Using bitwise operations can be
  tedious and error-prone otherwise.
- [inverting](#invertpermission). For example a
  [`umask`](https://linux.die.net/man/2/umask) of `117` means new files will be
  created with `661` permissions.
- checking the [minimal](#minpermissions) or
  [maximal](#maxpermissions) permissions among a list of them.
  This can be useful to aggregate all the permissions of several files,
  e.g. during a directory recursion.
- manipulating only a [specific user class](#selectuserpermission)
  inside a permission. This can be useful if you're only interested about the
  part of the permission related to the current user/process for example.

Permissions are manipulated as strings, not as file paths. This means you must
use other utilities (such as
[`chmod`](https://linux.die.net/man/1/chmod) or
[`stat`](https://linux.die.net/man/2/stat)) to get and set file permissions
using those strings.

# Examples (JavaScript)

<!-- eslint-disable handle-callback-err, node/prefer-global/process -->

```js
// Retrieve a file's permission as an object instead of a number
fs.stat('/etc/passwd', (error, stat) => convert.object(stat.mode))

// Set a file's permission using `symbolic` notation instead of a number
fs.chmod('/etc/passwd', convert.number('a=r'))

// Set a file's permission using `symbolic` notation instead of a number
fs.writeFile('/my/file', content, { mode: convert.number('a=r') })

// Disallow executing new files using `umask`
process.umask(convert.number(invert('a-x')))

// Allow your library's users to use any Unix permission type as input
myLibrary.method({ mode: 'a-wx' })
myLibrary.method({ mode: 444 })
```

# Examples (CLI)

```bash
$ stat -c "%a" /etc/passwd
644
$ unix-permissions convert.symbolic "$(stat -c "%a" /etc/passwd)"
u=rw,go=r
```

# Installation

```bash
$ npm install unix-permissions
```

# Usage (JavaScript)

```js
const { convert } = require('unix-permissions')

// `permission` will be set to `rw-rw----`
const permission = convert.stat('660')
```

Several methods other than `convert` are available but they mostly follow the
same pattern.
Permission strings are passed as input and returned as output.

# Usage (CLI)

```bash
$ unix-permissions convert.stat 660
rw-rw----
```

The same methods as in JavaScript are available. Exit code will be `1` if an
error occurred, e.g. if the permission syntax is invalid.

# Types

You can use any of the following permission types as input. You can also
[`convert()`](#convertoctalpermission) between them.

## octal

Permission type used by [`chmod`](https://linux.die.net/man/1/chmod).

Octal string where each digit represents a user class: `user`, `group` and
`others`. Each digit's is a [bitfield](https://en.wikipedia.org/wiki/Bit_field)
representing `read`, `write` and `execute`. Special permissions
([`setuid`](https://en.wikipedia.org/wiki/Setuid),
[`setgid`](https://en.wikipedia.org/wiki/Setuid) and
[`sticky`](https://en.wikipedia.org/wiki/Sticky_bit)) can optionally be
specified by prepending another digit.

An operator can be prepended:

- `=` (default): unset omitted permissions
- `+`: leave omitted permissions as is
- `-`: unset specified permissions)

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
convert.stat('720') // 'rwx-w----'
convert.stat('7000') // '--S--S--T'
convert.stat('\\720') // 'rwx-w----'
convert.stat('0720') // 'rwx-w----'
convert.stat('0o720') // 'rwx-w----'
convert.symbolic('+720') // 'u+rwx,g+w'
convert.symbolic('-720') // 'u-rwx,g-w'
convert.symbolic('=720') // 'u=rwx,g=w,o='
```

# number

Permission type used by Node.js
[`fs.chmod()`](https://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback).

It is the same as `octal` except:

- as a decimal number.
- no operator can be used.

<!-- eslint-disable line-comment-position, no-inline-comments, no-magic-numbers -->

```js
convert.stat(0) // '---------'
convert.stat(1) // '--------x'
convert.stat(3) // '-------wx'
convert.stat(8) // '-----x---'
convert.stat(512) // '--------T'
```

# stat

Permission type used by [`stat`](https://linux.die.net/man/2/stat) and
[`ls`](https://linux.die.net/man/1/ls).

It is a string where each character represents either the permission (`r`, `w`,
`x`) or no permission (`-`). The special permission are indicated with `S`,
`s`, `T` and `t` where lowercase implies `x` is also present.

Optionally a first character can be specified to indicate the file type (e.g.
`d` for directories).

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
convert.octal('--------x') // '0001'
convert.octal('--x--x--x') // '0111'
convert.octal('--------T') // '1000'
convert.octal('--------t') // '1001'
convert.octal('d--------x') // '0001'
convert.octal('--x --x --x') // '0111'
convert.octal('rwx --- ---') // '0700'
convert.octal('xwr --- ---') // '0700'
```

# symbolic

Permission type used by [`chmod`](https://linux.die.net/man/1/chmod) as a
string like `gu+rx`.

Starts with the user class (`a` for all, `u` for user, `g` for group, `o` for
others) then the operator (`+`, `-` or `=`) and ends with the permissions
characters.

While `+` leaves the omitted permissions as is, `=` unsets them. For example
`o=x` is the same as combining `o+x` and `o-rwt`.

Several groups can be specified using a comma-separated list like `g+x,o+r`.

User classes can be concatenated like `go+x`.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
convert.octal('o+wx') // '+0003'
convert.octal('o=wx') // '0003'
convert.octal('o-wx') // '-0003'
convert.octal('go+x') // '+0011'
convert.octal('g+x,o+x') // '+0011'
convert.octal('a+x') // '+0111'
convert.octal('+x') // '+0111'
convert.octal('a+s') // '+6000'
convert.octal('o+') // '+0000'
```

# object

Permission type as an object such as `{ user: { read: true, write: false } }`.

The first-level key is `user`, `group` or `others`. The second-level key is
`read`, `write`, `execute`, `setuid`, `setgid` or `sticky` (the last three are
the special permissions).

The values can be `true`, `false` or `undefined`. `undefined` leaves
permissions as is while `false` unsets them.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
convert.symbolic({ others: { read: true, execute: true } }) // 'o+rx'
convert.symbolic({ others: { read: true, execute: false } }) // 'o+r,o-x'
convert.symbolic({ others: { read: true, execute: undefined } }) // 'o+r'
convert.symbolic({}) // 'a+'
convert.symbolic({
  user: { setuid: true },
  group: { setgid: true },
  others: { sticky: true },
}) // 'ug+s,o+t'
```

# Methods

## `convert.octal(permission)`

## `convert.number(permission)`

## `convert.stat(permission)`

## `convert.symbolic(permission)`

## `convert.object(permission)`

Returns `permission` converted to another [`type`](#types).

Note that [`symbolic`](#symbolic) and [`object`](#object) distinguish between
leaving permissions as is (omitting them or using `undefined`) and unsetting
them (using `-` or `false`). [`number`](#number) and [`stat`](#stat) do not
make this distinction. If you convert between them, you might lose this
information as we assume `-` and `0` in [`number`](#number) and [`stat`](#stat)
mean "unset permissions". However you can use
[`positive()`](#positivepermission) to overcome this issue.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
convert.symbolic('111') // 'a=x'
positive(convert.symbolic('111')) // 'a+x'
convert.octal('o+x') // '+0001'
convert.octal('o=x') // '0001'
```

## `type(permission)`

Returns the `permission`'s [`type`](#types) or `'invalid'`.

<!-- eslint-disable line-comment-position, no-inline-comments, no-magic-numbers -->

```js
type('1') // 'octal'
type(1) // 'number'
type(0.5) // 'invalid'
type('a+x') // 'symbolic'
```

## `normalize(permission)`

Normalize a `permission` to its canonical shape.

Throw an exception if `permission` is invalid.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
normalize('1') // '0001'
normalize('g+x,o+x') // 'go+x'
normalize('d--- --- ---') // '---------'
normalize({ user: { read: undefined, write: true } })
// { user: { write: true } }
normalize('z+x') // Throws an exception
```

## `positive(permission)`

Remove all negative permissions. See
[convert()](#convertoctalpermission) for more explanation.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
positive('o+x,o-rw') // 'o+x'
positive('o=x') // 'o+x'
positive('660') // '+0660'
invert('660') // '0117'
invert(positive('660')) // '-0660'
```

## `contain(permission, permissions...)`

Tests whether `permission` includes `permissions`.

Returns `true` or `false` or (on the CLI) use the exit code `0` or `1`.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
contain('--x--x--x', 'a=x') // `true`
contain('--x--x--x', 'a+x') // `true`
contain('--x--x--x', 'a-x') // `false`
contain('--x--x--x', 'a-w') // `true`
contain('o+x', 'o+x') // `true`
contain('o+x', 'o+x,o+x') // `true`
contain('o+x', 'o=w') // `false`
contain('o+x,o-w', 'o-w,o+x') // `true`
contain('o+x,o-w', 'o-w') // `true`
contain('o+x,o-w', 'o+x', 'o-w') // `true`
```

## `equal(permission, permissions...)`

Tests whether `permission` equals exactly `permissions`.

Returns `true` or `false` or (on the CLI) use the exit code `0` or `1`.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
equal('--x--x--x', 'a=x') // `true`
equal('--x--x--x', 'a+x') // `false`
equal('--x--x--x', 'a-x') // `false`
equal('--x--x--x', 'a-w') // `false`
equal('o+x', 'o+x') // `true`
equal('o+x', 'o+x,o+x') // `true`
equal('o+x', 'o=w') // `false`
equal('o+x,o-w', 'o-w,o+x') // `true`
equal('o+x,o-w', 'o-w') // `false`
equal('o+x,o-w', 'o+x', 'o-w') // `false`
```

## `set(permission, permissions...)`

Returns the result of setting `permissions` on `permission`.

This is useful to avoid error-prone bitwise operations.

This can also be used to remove special permissions using
`set(permission, 'a-st')` since some functions like
[`umask`](https://linux.die.net/man/2/umask) do not allow them.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
set('---------', 'a+x') // '--x--x--x'
set('---------', 'a+x', 'a+r') // 'r-xr-xr-x'
set('--x--x--x', 'o-x') // '--x--x---'
set('a+x', 'a+r') // 'a+rx'
set('4660', 'a-st') // '0660'
```

## `not(permission)`

Inverts `permission` including special permissions.

This can be used in combination with `set()` to unset `permissions` instead of
setting them.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
not('u+xs') // 'u-xs'
not('u-xs') // 'u+xs'
not('u=x') // 'u=rws'
not('a=x') // 'ug=rws,o=rwt'
not('rws-ws-w-') // '---r--r-t'
not('0660') // '7117'
not('1660') // '6117'
set('rwxrwxrwx', not('a+x')) // 'rw-rw-rw-'
set('---------', not('a-x')) // '--x--x--x'
set('a+xr', not('a+r')) // 'a+x,a-r'
```

## `invert(permission)`

Inverts `permission` and removes special permissions.

For example a [`umask`](https://linux.die.net/man/2/umask) of `117` means new
files will be created with `661` permissions.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
invert('u+xs') // 'u-x'
invert('u-xs') // 'u+x'
invert('u=x') // 'u+rw,u-x'
invert('a=x') // 'a+rw,a-x'
invert('rws-ws-w-') // '---r--r-x'
invert('0660') // '0117'
invert('1660') // '0117'
```

## `min(permissions...)`

Retrieve the lowest permissions among all argument.

This does not return the lowest argument. Instead it returns a combination
of the lowest bits of all arguments.

This can be useful if you are looking for the lowest permission of a several
files, e.g. during a directory recursion.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
min('404', '440', '402') // '0400'
```

## `max(permissions...)`

Inverse of [`min()`](#minpermissions).

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
max('404', '440', '402') // '0446'
```

## `select.user(permission)`

## `select.group(permission)`

## `select.others(permission)`

Returns the part within `permission` specific to `user`, `group` or `others`.

The return value cannot be used as argument with any other methods of this
library except `deselect()`.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
select.user('u+wr,g+x') // '+rw'
select.group('421') // '2'
select.others({ others: { read: true } }) // { read: true }
select.others('rw-rw-r--') // 'r--'
```

## `deselect.user(permission)`

## `deselect.group(permission)`

## `deselect.others(permission)`

Inverse of [`select.user()`](#selectuserpermission),
[`select.group()`](#selectgrouppermission) and
[`select.others()`](#selectotherspermission).

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
deselect.user('+wr') // 'u+rw'
deselect.group('2') // '0020'
deselect.others({ read: true }) // { others: { read: true } }
deselect.others('r--') // '------r--'
```
