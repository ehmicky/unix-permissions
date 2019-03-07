# API

All the following methods are available both in
[JavaScript](../README.md#usage-javascript) and on the
[command line](../README.md#usage-cli).

## convert.octal|number|stat|symbolic|object(permission)

Returns `permission` converted to another [`type`](#types).

Note that [`symbolic`](#symbolic) and [`object`](#object) distinguish between:

- leaving permissions as is (omitting them or using `undefined`)
- unsetting them (using `-` or `false`).

[`number`](#number) and [`stat`](#stat) do not
make this distinction. If you convert between them, you might lose this
information as we assume `0` in [`number`](#number) and `-` in
[`stat`](#stat) mean "unset permissions". However you can use
[`positive()`](#positivepermission) to overcome this issue.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
convert.symbolic('111') // 'a=x'
positive(convert.symbolic('111')) // 'a+x'
convert.octal('o+x') // '+0001'
convert.octal('o=x') // '0001'
```

## type(permission)

Returns the `permission`'s [`type`](#types) or `'invalid'`.

<!-- eslint-disable line-comment-position, no-inline-comments, no-magic-numbers -->

```js
type('1') // 'octal'
type(1) // 'number'
type(0.5) // 'invalid'
type('a+x') // 'symbolic'
```

## normalize(permission)

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

## positive(permission)

Remove all negative permissions. See
[convert()](#convertoctalnumberstatsymbolicobjectpermission) for more
explanation.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
positive('o+x,o-rw') // 'o+x'
positive('o=x') // 'o+x'
positive('660') // '+0660'
invert('660') // '0117'
invert(positive('660')) // '-0660'
```

## contain(permission, permissions...)

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

## equal(permission, permissions...)

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

## set(permission, permissions...)

Returns the result of setting `permissions` on `permission`.

This is useful to avoid error-prone bitwise operations (`|`, `&`, `^`, `~`).

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

## not(permission)

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

## invert(permission)

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

## min(permissions...)

Retrieve the lowest permissions among all arguments.

This does not return the lowest argument. Instead it returns a combination
of the lowest bits of all arguments.

This can be useful if you are looking for the lowest permission of a several
files, e.g. during a directory recursion.

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
min('404', '440', '402') // '0400'
```

## max(permissions...)

Inverse of [`min()`](#minpermissions).

<!-- eslint-disable line-comment-position, no-inline-comments -->

```js
max('404', '440', '402') // '0446'
```
