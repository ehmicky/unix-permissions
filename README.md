<img src="https://raw.githubusercontent.com/ehmicky/design/master/unix-permissions/unix-permissions.png?sanitize=true" width="550"/>

[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/unix-permissions.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/unix-permissions) [![Travis](https://img.shields.io/badge/cross-platform-4cc61e.svg?logo=travis)](https://travis-ci.org/ehmicky/unix-permissions) [![Node](https://img.shields.io/node/v/unix-permissions.svg?logo=node.js)](https://www.npmjs.com/package/unix-permissions) [![Gitter](https://img.shields.io/gitter/room/ehmicky/unix-permissions.svg?logo=gitter)](https://gitter.im/ehmicky/unix-permissions)

Swiss Army knife for Unix permissions.

[Unix file permissions](https://en.wikipedia.org/wiki/File_system_permissions)
can take many [shapes](#types): [symbolic](docs/types.md#symbolic) (`ug+rw`),
[octal](docs/types.md#octal) (`660`) or a
[list of characters](docs/types.md#stat) (`drw-rw----`).
This library enables using any of [these](#types) (instead of being
limited to a single one) with any [Node.js](#examples-javascript) or
[CLI command](#examples-cli).

This library can also perform operations on Unix permissions such as:

- [testing](docs/API.md#containpermission-permissions),
  [setting](docs/API.md#setpermission-permissions) and
  [unsetting](docs/API.md#notpermission-permissions). Using bitwise operations
  (`|`, `&`, `^`, `~`) can be tedious and error-prone otherwise.
- [validating](docs/API.md#normalizepermission) syntax.
- [normalizing](docs/API.md#normalizepermission). For example `u+r,u+w` can be
  shortened to `u+rw`.
- [inverting](docs/API.md#invertpermission). For example a
  [`umask`](https://linux.die.net/man/2/umask) of `117` means new files will be
  created with `661` permissions.
- checking the [minimal](docs/API.md#minpermissions) or
  [maximal](docs/API.md#maxpermissions) permissions among a list of them.
  This can be useful to aggregate all the permissions of several files,
  e.g. during a directory recursion.

Permissions are manipulated as strings, not as file paths. This means you must
use other utilities (such as
[`chmod`](https://linux.die.net/man/1/chmod) or
[`stat`](https://linux.die.net/man/2/stat)) to get and set file permissions
using those strings.

# Examples (JavaScript)

<!-- eslint-disable handle-callback-err, node/prefer-global/process, no-sync -->

```js
// Retrieve a file's permission as an object like
// `{ user: { write: false, read: true, ... }, ... }` instead of a number
convert.object(fs.statSync('/etc/passwd').mode)

// Set a file's permission using `symbolic` notation instead of a number
fs.chmod('/etc/passwd', convert.number('a=r'))

// Set a file's permission using `symbolic` notation instead of a number
fs.writeFile('/my/file', content, { mode: convert.number('a=r') })

// Disallow executing new files using `umask`
process.umask(convert.number(invert('a-x')))

// If your library takes Unix permissions as input, using
// `unix-permissions` under the hood lets your users choose their
// favorite Unix permissions type.
myLibrary.method({ mode: 'a-wx' })
myLibrary.method({ mode: '444' })
```

# Examples (CLI)

```bash
$ stat -c "%a" /etc/passwd
644

$ unix-permissions convert.symbolic "$(stat -c "%a" /etc/passwd)"
u=rw,go=r
```

# Install

```bash
npm install unix-permissions
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
[`convert()`](docs/API.md#convertoctalnumberstatsymbolicobjectpermission)
between them:

- [`octal`](docs/types.md#octal) strings like `"422"`
- decimal [`number`](docs/types.md#number) like `274`
- [`stat`](docs/types.md#stat) like `rw-rw-r--`
- [`symbolic`](docs/types.md#symbolic) like `a+rw`
- [`object`](docs/types.md#object) like `{ user: { read: true, write: false, execute: false }, group: { write: false }, others: { write: false } }`

Special permissions ([setuid](https://en.wikipedia.org/wiki/Setuid),
[setgid](https://en.wikipedia.org/wiki/Setuid),
[sticky](https://en.wikipedia.org/wiki/Sticky_bit)) can be used.

Please see the [types full documentation](docs/types.md).

# Methods

Please see the [methods full documentation](docs/API.md) for more information
and examples.

## convert.octal|number|stat|symbolic|object(permission)

Convert `permission` to another type.

## type(permission)

Returns the `permission`'s type or `invalid`.

## normalize(permission)

Normalize a `permission` to its canonical shape. Throw if `permission` is
invalid.

## positive(permission)

Remove all negative permissions.

## contain(permission, permissions...)

Tests whether `permission` includes `permissions`.

## equal(permission, permissions...)

Tests whether `permission` equals exactly `permissions`.

## set(permission, permissions...)

Set `permissions` on `permission`. This is useful to avoid error-prone bitwise
operations (`|`, `&`, `^`, `~`).

## not(permission)

Inverts `permission` including special permissions. This can be used in
combination with `set()` to unset `permissions` instead of setting them.

## invert(permission)

Inverts `permission` and removes special permissions.

## min(permissions...)

Retrieve the lowest permissions among all arguments.

## max(permissions...)

Retrieve the highest permissions among all arguments.
