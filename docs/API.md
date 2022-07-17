# API

The following methods are available both in
[JavaScript](../README.md#usage-javascript) and on the
[command line](../README.md#usage-cli).

You can try all the examples below:

- either directly [in your browser](https://repl.it/@ehmicky/unix-permissions).
- or by executing the [`examples` files](../examples/README.md) in a terminal.

All methods (except [`type()`](#typepermission)) throw an exception if the
`permission` argument is invalid. Please see the
[permission types documentation](types.md).

## convert.octal|number|stat|symbolic|object(permission)

Returns `permission` converted to another [`type`](types.md).

Note that [`symbolic`](types.md#symbolic) and [`object`](types.md#object)
distinguish between:

- leaving permissions as is (omitting them or using `undefined`)
- unsetting them (using `-` or `false`).

[`number`](types.md#number) and [`stat`](types.md#stat) do not make this
distinction. If you convert between them, you might lose this information as we
assume `0` in [`number`](types.md#number) and `-` in [`stat`](types.md#stat)
mean "unset permissions". However you can use
[`positive()`](#positivepermission) to overcome this issue.

```js
import { convert } from 'unix-permissions'

console.log(convert.symbolic('111')) // 'a=x'
console.log(positive(convert.symbolic('111'))) // 'a+x'
console.log(convert.octal('o+x')) // '+0001'
console.log(convert.octal('o=x')) // '0001'

try {
  convert.octal('z+x') // Throws an exception (permission syntax is invalid)
} catch (error) {
  console.log(error.message)
}
```

## type(permission)

Returns the `permission`'s [`type`](types.md) or `'invalid'`.

```js
import { type } from 'unix-permissions'

console.log(type('1')) // 'octal'
console.log(type(1)) // 'number'
console.log(type('a+x')) // 'symbolic'
console.log(type('a+i')) // 'invalid'
```

## normalize(permission)

Normalizes a `permission` to its canonical shape.

Throws an exception if `permission` is invalid.

```js
import { normalize } from 'unix-permissions'

console.log(normalize('1')) // '0001'
console.log(normalize('g+x,o+x')) // 'go+x'
console.log(normalize('d--- --- ---')) // '---------'
console.log(normalize({ user: { read: undefined, write: true } }))
// { user: { write: true } }

try {
  normalize('z+x') // Throws an exception (permission syntax is invalid)
} catch (error) {
  console.log(error.message)
}
```

## positive(permission)

Removes all negative permissions. See
[convert()](#convertoctalnumberstatsymbolicobjectpermission) for more
explanation.

```js
import { positive } from 'unix-permissions'

console.log(positive('o+x,o-rw')) // 'o+x'
console.log(positive('o=x')) // 'o+x'
console.log(positive('660')) // '+0660'
console.log(invert('660')) // '0117'
console.log(invert(positive('660'))) // '-0660'
```

## contain(permission, permissions...)

Tests whether `permission` includes `permissions`.

Returns `true` or `false` or (on the CLI) use the exit code `0` or `1`.

```js
import { contain } from 'unix-permissions'

console.log(contain('--x--x--x', 'a=x')) // `true`
console.log(contain('--x--x--x', 'a+x')) // `true`
console.log(contain('--x--x--x', 'a-x')) // `false`
console.log(contain('--x--x--x', 'a-w')) // `true`
console.log(contain('o+x', 'o+x')) // `true`
console.log(contain('o+x', 'o+x,o+x')) // `true`
console.log(contain('o+x', 'o=w')) // `false`
console.log(contain('o+x,o-w', 'o-w,o+x')) // `true`
console.log(contain('o+x,o-w', 'o-w')) // `true`
console.log(contain('o+x,o-w', 'o+x', 'o-w')) // `true`
```

## equal(permission, permissions...)

Tests whether `permission` equals exactly `permissions`.

Returns `true` or `false` or (on the CLI) use the exit code `0` or `1`.

```js
import { equal } from 'unix-permissions'

console.log(equal('--x--x--x', 'a=x')) // `true`
console.log(equal('--x--x--x', 'a+x')) // `false`
console.log(equal('--x--x--x', 'a-x')) // `false`
console.log(equal('--x--x--x', 'a-w')) // `false`
console.log(equal('o+x', 'o+x')) // `true`
console.log(equal('o+x', 'o+x,o+x')) // `true`
console.log(equal('o+x', 'o=w')) // `false`
console.log(equal('o+x,o-w', 'o-w,o+x')) // `true`
console.log(equal('o+x,o-w', 'o-w')) // `false`
console.log(equal('o+x,o-w', 'o+x', 'o-w')) // `false`
```

## set(permission, permissions...)

Returns the result of setting `permissions` on `permission`.

This is useful to avoid error-prone bitwise operations (`|`, `&`, `^`, `~`).

This can also be used to remove special permissions using
`set(permission, 'a-st')` since some functions like
[`umask`](https://linux.die.net/man/2/umask) do not allow them.

```js
import { set } from 'unix-permissions'

console.log(set('---------', 'a+x')) // '--x--x--x'
console.log(set('---------', 'a+x', 'a+r')) // 'r-xr-xr-x'
console.log(set('--x--x--x', 'o-x')) // '--x--x---'
console.log(set('a+x', 'a+r')) // 'a+rx'
console.log(set('4660', 'a-st')) // '0660'
```

## not(permission)

Inverts `permission` including special permissions.

This can be used in combination with `set()` to unset `permissions` instead of
setting them.

```js
import { not } from 'unix-permissions'

console.log(not('u+xs')) // 'u-xs'
console.log(not('u-xs')) // 'u+xs'
console.log(not('u=x')) // 'u=rws'
console.log(not('a=x')) // 'ug=rws,o=rwt'
console.log(not('rws-ws-w-')) // '---r--r-t'
console.log(not('0660')) // '7117'
console.log(not('1660')) // '6117'
console.log(set('rwxrwxrwx', not('a+x'))) // 'rw-rw-rw-'
console.log(set('---------', not('a-x'))) // '--x--x--x'
console.log(set('a+xr', not('a+r'))) // 'a+x,a-r'
```

## invert(permission)

Inverts `permission` and removes special permissions.

For example a [`umask`](https://linux.die.net/man/2/umask) of `117` means new
files will be created with `661` permissions.

```js
import { invert } from 'unix-permissions'

console.log(invert('u+xs')) // 'u-x'
console.log(invert('u-xs')) // 'u+x'
console.log(invert('u=x')) // 'u+rw,u-x'
console.log(invert('a=x')) // 'a+rw,a-x'
console.log(invert('rws-ws-w-')) // '---r--r-x'
console.log(invert('0660')) // '0117'
console.log(invert('1660')) // '0117'
```

## min(permissions...)

Retrieves the lowest permissions among all arguments.

This does not return the lowest argument. Instead it returns a combination of
the lowest bits of all arguments.

This can be useful if you are looking for the lowest permission of a several
files, e.g. during a directory recursion.

```js
import { min } from 'unix-permissions'

console.log(min('404', '440', '402')) // '0400'
```

## max(permissions...)

Inverse of [`min()`](#minpermissions).

```js
import { max } from 'unix-permissions'

console.log(max('404', '440', '402')) // '0446'
```
