[![downloads](https://img.shields.io/npm/dt/unix-permissions.svg?logo=npm)](https://www.npmjs.com/package/unix-permissions) [![last commit](https://img.shields.io/github/last-commit/ehmicky/unix-permissions.svg?logo=github&logoColor=white)](https://github.com/ehmicky/unix-permissions/graphs/contributors) [![license](https://img.shields.io/badge/license-Apache%202.0-4cc61e.svg?logo=github&logoColor=white)](https://www.apache.org/licenses/LICENSE-2.0) [![Coverage Status](https://img.shields.io/codecov/c/github/ehmicky/unix-permissions.svg?label=test%20coverage&logo=codecov)](https://codecov.io/gh/ehmicky/unix-permissions) [![travis](https://img.shields.io/travis/ehmicky/unix-permissions/master.svg?logo=travis)](https://travis-ci.org/ehmicky/unix-permissions/builds) [![npm](https://img.shields.io/npm/v/unix-permissions.svg?logo=npm)](https://www.npmjs.com/package/unix-permissions) [![node](https://img.shields.io/node/v/unix-permissions.svg?logo=node.js)](#) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?logo=javascript)](https://standardjs.com) [![eslint-config-standard-prettier-fp](https://img.shields.io/badge/eslint-config--standard--prettier--fp-4cc61e.svg?logo=eslint&logoColor=white)](https://github.com/ehmicky/eslint-config-standard-prettier-fp) [![Gitter](https://img.shields.io/gitter/room/ehmicky-code/unix-permissions.svg?logo=gitter)](https://gitter.im/ehmicky-code/unix-permissions)

[Unix file permissions](https://en.wikipedia.org/wiki/File_system_permissions)
can take several [shapes](#types). With
[`chmod`](https://linux.die.net/man/1/chmod) they
look like either [`ug+rw`](#symbolic) or [`660`](#octal), while with
[`stat`](https://linux.die.net/man/2/stat) and
[`ls`](https://linux.die.net/man/1/ls) they look like [`drw-rw----`](#stat).
This library [converts](#convertoctalpermission) Unix permissions between
these different [shapes](#types).

It also allows you to perform operations on them including:

- [validating](#normalizepermission) syntax.
- [normalizing](#normalizepermission). For example `u+rw,u-r` can be shortened
  to `u+w`.
- [testing](#containpermission-permissions), e.g. "Is this executable by any
  users?"
- [setting](#setpermission-permissions) and
  [unsetting](#unsetpermission-permissions). Using bitwise operations can be
  tedious and error-prone.
- [inverting](#flippermission). For example a
  [`umask`](https://linux.die.net/man/2/umask) of `117` means new files will be
  created with `661` permissions.
- checking the [minimal](#minpermissions) or
  [maximal](#maxpermissions) permissions among a list of them.
  This can be useful to aggregate all the permissions of several files,
  e.g. during a directory recursion.
- manipulating only a [specific user class](#selectuserpermission)
  inside a permission. This can be useful if you're only interested about the
  part of the permission related to the current user/process for example.

Note that permissions are manipulated as strings, not as file paths.
This means you must use other utilities (such as
[`chmod`](https://linux.die.net/man/1/chmod) or
[`stat`](https://linux.die.net/man/2/stat)) to get and set file permissions
using those strings.

# Installation

```bash
$ npm install unix-permissions
```

# Usage (JavaScript)

```js
const unixPermissions = require('unix-permissions')

// `permission` will be set to `rw-rw----`
const permission = unixPermissions.convert.stat('660')
```

Several methods are available but they mostly follow the same pattern.
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

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.convert.stat('720') // 'rwx-w----'
unixPermissions.convert.stat('7000') // '--S--S--T'
unixPermissions.convert.stat('\\720') // 'rwx-w----'
unixPermissions.convert.stat('0720') // 'rwx-w----'
unixPermissions.convert.stat('0o720') // 'rwx-w----'
unixPermissions.convert.symbolic('+720') // 'u+rwx,g+w'
unixPermissions.convert.symbolic('-720') // 'u-rwx,g-w'
unixPermissions.convert.symbolic('=720') // 'u=rwx,g=w,o='
```

# number

Permission type used by Node.js
[`fs.chmod()`](https://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback).

It is the same as `octal` but as a decimal number.

<!-- eslint-disable line-comment-position, no-inline-comments, no-magic-numbers -->

```js
unixPermissions.convert.stat(0) // '---------'
unixPermissions.convert.stat(1) // '--------x'
unixPermissions.convert.stat(3) // '-------wx'
unixPermissions.convert.stat(8) // '-----x---'
unixPermissions.convert.stat(512) // '--------T'
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
unixPermissions.convert.symbolic('--------x') // 'o+x'
unixPermissions.convert.symbolic('--x--x--x') // 'a+x'
unixPermissions.convert.symbolic('--------T') // 'o+t'
unixPermissions.convert.symbolic('--------t') // 'o+xt'
unixPermissions.convert.symbolic('d--------x') // 'o+x'
unixPermissions.convert.symbolic('--x --x --x') // 'a+x'
unixPermissions.convert.symbolic('rwx --- ---') // 'u+rwx'
unixPermissions.convert.symbolic('xwr --- ---') // 'u+rwx'
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
unixPermissions.convert.stat('o+wx') // '-------wx'
unixPermissions.convert.stat('o=wx') // '-------wx'
unixPermissions.convert.stat('o-wx') // '---------'
unixPermissions.convert.stat('go+x') // '-----x--x'
unixPermissions.convert.stat('g+x,o+x') // '-----x--x'
unixPermissions.convert.stat('a+x') // '--x--x--x'
unixPermissions.convert.stat('+x') // '--x--x--x'
unixPermissions.convert.stat('a+s') // '--S--S---'
unixPermissions.convert.stat('o+') // '---------'
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
unixPermissions.convert.stat({ others: { execute: true } }) // '--------x'
unixPermissions.convert.stat({ others: { execute: false } }) // '---------'
unixPermissions.convert.stat({ others: { execute: undefined } }) // '---------'
unixPermissions.convert.stat({}) // '---------'
unixPermissions.convert.stat({
  user: { setuid: true },
  group: { setgid: true },
  others: { sticky: true },
}) // '--S--S--T'
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
mean "leave permissions as is". However you can use [`full()`](#fullpermission)
and [`partial()`](#partialpermission) to overcome this issue.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.convert.symbolic('001') // 'o+x'
unixPermissions.full(unixPermissions.convert.symbolic('001')) // 'o=x'
unixPermissions.convert.octal('o+x') // '0001'
unixPermissions.convert.octal('o=x') // '=0001'
```

## `type(permission)`

Returns the `permission`'s [`type`](#types) or `'invalid'`.

<!-- eslint-disable line-comment-position, no-inline-comments, no-magic-numbers -->

```js
unixPermissions.type('1') // 'octal'
unixPermissions.type(1) // 'number'
unixPermissions.type(0.5) // 'invalid'
unixPermissions.type('a+x') // 'symbolic'
```

## `normalize(permission)`

Normalize a `permission` to its canonical shape.

Throw an exception if `permission` is invalid.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.normalize('1') // '0001'
unixPermissions.normalize('g+x,o+x') // 'go+x'
unixPermissions.normalize('d--- --- ---') // '---------'
unixPermissions.normalize({ user: { read: undefined, write: true } })
// { user: { write: true } }
unixPermissions.normalize('z+x') // Throws an exception
```

## `full(permission)`

Converts all the omitted permissions to negative permissions. See
[convert()](#convertoctalpermission) for more explanation.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.full('a+x') // 'a=x'
unixPermissions.convert.symbolic('001') // 'o+x'
unixPermissions.full(unixPermissions.convert.symbolic('001')) // 'ug=,o=x'
```

## `partial(permission)`

Inverse of [`full()`](#fullpermission). Remove all the negative permissions.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.partial('o=x') // 'o+x'
unixPermissions.partial('o+x,o-r') // 'o+x'
unixPermissions.invert('660') // '=0117'
unixPermissions.partial(unixPermissions.invert('660')) // '0117'
```

## `contain(permission, permissions...)`

Tests whether `permission` includes `permissions`.

Returns `true` or `false` or (on the CLI) use the exit code `0` or `1`.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.contain('--------x', 'o+x') // `true`
unixPermissions.contain('--------x', 'o-x') // `false`
unixPermissions.contain('--------x', 'o-w') // `false`
unixPermissions.contain('o+x', 'o+x') // `true`
unixPermissions.contain('o+x', 'o+x,o+x') // `true`
unixPermissions.contain('o+x', 'o=w') // `false`
unixPermissions.contain('o+x,o-w', 'o+x,o-w') // `true`
unixPermissions.contain('o+x,o-w', 'o-w') // `true`
unixPermissions.contain('o+x,o-w', 'o+x', 'o-w') // `true`
```

## `equal(permission, permissions...)`

Tests whether `permission` equals exactly `permissions`.

Returns `true` or `false` or (on the CLI) use the exit code `0` or `1`.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.equal('--------x', 'o+x') // `true`
unixPermissions.equal('--------x', 'o-x') // `false`
unixPermissions.equal('--------x', 'o-w') // `false`
unixPermissions.equal('o+x', 'o+x') // `true`
unixPermissions.equal('o+x', 'o+x,o+x') // `true`
unixPermissions.equal('o+x', 'o=w') // `false`
unixPermissions.equal('o+x,o-w', 'o+x,o-w') // `true`
unixPermissions.equal('o+x,o-w', 'o-w') // `false`
unixPermissions.equal('o+x,o-w', 'o+x', 'o-w') // `false`
```

## `set(permission, permissions...)`

Returns the result of setting `permissions` on `permission`.

This is useful to avoid error-prone bitwise operations.

This can also be used to remove special permissions using
`set(permission, 'a-st')` since some functions like
[`umask`](https://linux.die.net/man/2/umask) do not allow them.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.set('---------', 'a+x') // '--x--x--x'
unixPermissions.set('---------', 'a+x', 'a+r') // 'r-xr-xr-x'
unixPermissions.set('--x--x--x', 'o-x') // '--x--x---'
unixPermissions.set('a+x', 'a+r') // 'a+rx'
unixPermissions.set('4660', 'a-st') // '=0660'
```

## `unset(permission, permissions...)`

Returns the result of unsetting `permissions` on `permission`.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.unset('rwxrwxrwx', 'a+x') // 'rw-rw-rw-'
unixPermissions.unset('rwxrwxrwx', 'a+x', 'a+r') // '-w--w--w-'
unixPermissions.unset('---------', 'a-x') // '--x--x--x'
unixPermissions.unset('a+xr', 'a+r') // 'a+x,a-r'
```

## `invert(permission)`

Inverts `permission` and unsets the special permissions.

For example a [`umask`](https://linux.die.net/man/2/umask) of `117` means new
files will be created with `661` permissions.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.invert('660') // '=0117'
unixPermissions.invert('7660') // '=0117'
unixPermissions.invert('rws-ws-w-') // '---r--r-x'
```

## `flip(permission)`

Inverts `permission` including the special permissions.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.flip('660') // '=7117'
unixPermissions.flip('7660') // '=0117'
unixPermissions.flip('rws-ws-w-') // '---r--r-t'
```

## `min(permissions...)`

Retrieve the lowest permissions among all argument.

This does not return the lowest argument. Instead it returns a combination
of the lowest bits of all arguments.

This can be useful if you are looking for the lowest permission of a several
files, e.g. during a directory recursion.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.min('404', '440', '402') // '0400'
```

## `max(permissions...)`

Inverse of [`min()`](#minpermissions).

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.max('404', '440', '402') // '0446'
```

## `select.user(permission)`

## `select.group(permission)`

## `select.others(permission)`

Returns the part within `permission` specific to `user`, `group` or `others`.

The return value cannot be used as argument with any other methods of this
library except `deselect()`.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.select.user('u+wr,g+x') // '+rw'
unixPermissions.select.group('421') // '2'
unixPermissions.select.others({ others: { read: true } }) // { read: true }
unixPermissions.select.others('rw-rw-r--') // 'r--'
```

## `deselect.user(permission)`

## `deselect.group(permission)`

## `deselect.others(permission)`

Inverse of [`select.user()`](#selectuserpermission),
[`select.group()`](#selectgrouppermission) and
[`select.others()`](#selectotherspermission).

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
unixPermissions.deselect.user('+wr') // 'u+rw'
unixPermissions.deselect.group('2') // '0020'
unixPermissions.deselect.others({ read: true }) // { others: { read: true } }
unixPermissions.deselect.others('r--') // '------r--'
```

# Examples

## Using with Node.js core methods

This library can be used to specify file permissions using other [types](#types)
than numbers with Node.js.

<!-- eslint-disable handle-callback-err -->

```js
fs.stat('/etc/passwd', (error, stat) =>
  unixPermissions.convert.object(stat.mode),
)
```

<!-- eslint-disable node/prefer-global/process -->

```js
// Disallow executing new files using `umask`
process.umask(unixPermissions.convert.number(unixPermissions.invert('a-x')))
```

```js
fs.chmod('/etc/passwd', unixPermissions.convert.number('a-r'))
```

```js
fs.writeFile('/my/file', content, {
  mode: unixPermissions.convert.number('a-r'),
})
```
