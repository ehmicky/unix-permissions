This directory contains examples of this library. They can be run and edited:

- either directly [in your browser](https://repl.it/@ehmicky/unix-permissions).
- or in a terminal with the following commands:

```bash
# Make a copy of this repository
git clone https://github.com/ehmicky/unix-permissions
cd unix-permissions
npm install

# To run JavaScript examples
node examples/PATH/TO/FILE.js
# To run command line examples
bash examples/PATH/TO/FILE.sh
```

# Examples

## Permission types

- [`octal`](../docs/types.md#octal):
  [JavaScript](types/octal.js), [command line](types/octal.sh).
- [`number`](../docs/types.md#number):
  [JavaScript](types/number.js)
- [`stat`](../docs/types.md#stat):
  [JavaScript](types/stat.js), [command line](types/stat.sh).
- [`symbolic`](../docs/types.md#symbolic):
  [JavaScript](types/symbolic.js), [command line](types/symbolic.sh).
- [`object`](../docs/types.md#object):
  [JavaScript](types/object.js), [command line](types/object.sh).

## Methods

- [`convert()`](../docs/API.md#convertoctalnumberstatsymbolicobjectpermission):
  [JavaScript](methods/convert.js), [command line](methods/convert.sh).
- [`type()`](../docs/API.md#typepermission):
  [JavaScript](methods/type.js), [command line](methods/type.sh).
- [`normalize()`](../docs/API.md#normalizepermission):
  [JavaScript](methods/normalize.js), [command line](methods/normalize.sh).
- [`positive()`](../docs/API.md#positivepermission):
  [JavaScript](methods/positive.js), [command line](methods/positive.sh).
- [`contain()`](../docs/API.md#containpermission-permissions):
  [JavaScript](methods/contain.js), [command line](methods/contain.sh).
- [`equal()`](../docs/API.md#equalpermission-permissions):
  [JavaScript](methods/equal.js), [command line](methods/equal.sh).
- [`set()`](../docs/API.md#setpermission-permissions):
  [JavaScript](methods/set.js), [command line](methods/set.sh).
- [`not()`](../docs/API.md#notpermission):
  [JavaScript](methods/not.js), [command line](methods/not.sh).
- [`invert()`](../docs/API.md#invertpermission):
  [JavaScript](methods/invert.js), [command line](methods/invert.sh).
- [`min()`](../docs/API.md#minpermissions):
  [JavaScript](methods/min.js), [command line](methods/min.sh).
- [`max()`](../docs/API.md#maxpermissions):
  [JavaScript](methods/max.js), [command line](methods/max.sh).
