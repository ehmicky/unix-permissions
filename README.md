<img src="https://raw.githubusercontent.com/ehmicky/design/main/unix-permissions/unix-permissions.png" width="500"/>

[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/unix-permissions.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/unix-permissions)
[![Node](https://img.shields.io/node/v/unix-permissions.svg?logo=node.js)](https://www.npmjs.com/package/unix-permissions)
[![TypeScript](https://img.shields.io/badge/-typed-brightgreen?logo=typescript&colorA=gray)](/src/main.d.ts)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-brightgreen.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-brightgreen.svg?logo=medium)](https://medium.com/@ehmicky)

Swiss Army knife for Unix permissions.

[Unix file permissions](https://en.wikipedia.org/wiki/File_system_permissions)
can take many [shapes](#permission-types): [symbolic](docs/types.md#symbolic)
(`ug+rw`), [octal](docs/types.md#octal) (`660`) or a
[list of characters](docs/types.md#stat) (`drw-rw----`). This library enables
using any of [these](#permission-types) (instead of being limited to a single
one) with any [Node.js](#examples-javascript) or [CLI command](#examples-cli).

This library can also perform operations on Unix permissions such as:

- [testing](docs/API.md#containpermission-permissions),
  [setting](docs/API.md#setpermission-permissions) and
  [unsetting](docs/API.md#notpermission). Using bitwise operations (`|`, `&`,
  `^`, `~`) can be tedious and error-prone otherwise.
- [validating](docs/API.md#normalizepermission) syntax.
- [normalizing](docs/API.md#normalizepermission). For example `u+r,u+w` can be
  shortened to `u+rw`.
- [inverting](docs/API.md#invertpermission). For example a
  [`umask`](https://linux.die.net/man/2/umask) of `117` means new files will be
  created with `661` permissions.
- checking the [minimal](docs/API.md#minpermissions) or
  [maximal](docs/API.md#maxpermissions) permissions among a list of them. This
  can be useful to aggregate all the permissions of several files, e.g. during a
  directory recursion.

Permissions are manipulated as strings, not as file paths. This means you must
use other utilities (such as [`chmod`](https://linux.die.net/man/1/chmod) or
[`stat`](https://linux.die.net/man/2/stat)) to get and set file permissions
using those strings.

# Examples

In JavaScript:

<!-- eslint-disable no-sync -->

```js
import { convert } from 'unix-permissions'

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

On the command line:

```bash
$ stat -c "%a" /etc/passwd
644

$ unix-permissions convert.symbolic "$(stat -c "%a" /etc/passwd)"
u=rw,go=r
```

# Demo

You can try this library:

- either directly [in your browser](https://repl.it/@ehmicky/unix-permissions).
- or by executing the [`examples` files](examples/README.md) in a terminal.

# Install

```bash
npm install unix-permissions
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# Usage (JavaScript)

```js
import { convert } from 'unix-permissions'

// `permission` will be set to `rw-rw----`
const permission = convert.stat('660')
```

Several methods other than `convert` are available but they mostly follow the
same pattern. Permission strings are passed as input and returned as output.

# Usage (CLI)

```bash
$ unix-permissions convert.stat 660
rw-rw----
```

The same methods as in JavaScript are available. Exit code will be `1` if an
error occurred, e.g. if the permission syntax is invalid.

# Permission types

You can use any of the following permission types as input. You can also
[`convert()`](docs/API.md#convertoctalnumberstatsymbolicobjectpermission)
between them:

- [`octal`](docs/types.md#octal) strings like `"422"`
- decimal [`number`](docs/types.md#number) like `274`
- [`stat`](docs/types.md#stat) like `rw-rw-r--`
- [`symbolic`](docs/types.md#symbolic) like `a+rw`
- [`object`](docs/types.md#object) like
  `{ user: { read: true, write: false, execute: false }, group: { write: false }, others: { write: false } }`

Special permissions ([setuid](https://en.wikipedia.org/wiki/Setuid),
[setgid](https://en.wikipedia.org/wiki/Setuid),
[sticky](https://en.wikipedia.org/wiki/Sticky_bit)) can be used.

Please see the [types full documentation](docs/types.md).

# Methods

## convert.octal|number|stat|symbolic|object(permission)

Converts `permission` to another type.\
[Full documentation](docs/API.md#convertoctalnumberstatsymbolicobjectpermission).

## type(permission)

Returns the `permission`'s type or `invalid`.\
[Full documentation](docs/API.md#typepermission).

## normalize(permission)

Normalizes a `permission` to its canonical shape. Throw if `permission` is
invalid.\
[Full documentation](docs/API.md#normalizepermission).

## positive(permission)

Removes all negative permissions.\
[Full documentation](docs/API.md#positivepermission).

## contain(permission, permissions...)

Tests whether `permission` includes `permissions`.\
[Full documentation](docs/API.md#containpermission-permissions).

## equal(permission, permissions...)

Tests whether `permission` equals exactly `permissions`.\
[Full documentation](docs/API.md#equalpermission-permissions).

## set(permission, permissions...)

Sets `permissions` on `permission`. This is useful to avoid error-prone bitwise
operations (`|`, `&`, `^`, `~`).\
[Full documentation](docs/API.md#setpermission-permissions).

## not(permission)

Inverts `permission` including special permissions. This can be used in
combination with `set()` to unset `permissions` instead of setting them.\
[Full documentation](docs/API.md#notpermission).

## invert(permission)

Inverts `permission` and removes special permissions.\
[Full documentation](docs/API.md#invertpermission).

## min(permissions...)

Retrieves the lowest permissions among all arguments.\
[Full documentation](docs/API.md#minpermissions).

## max(permissions...)

Retrieves the highest permissions among all arguments.\
[Full documentation](docs/API.md#maxpermissions).

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/unix-permissions/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/unix-permissions/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
