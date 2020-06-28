/* eslint-disable max-lines */
export const COMMANDS = [
  {
    command: 'convert.number <permission>',
    describe: 'Returns permission converted to a decimal number.',
    examples: [['$0 convert.number 422', 'Output: 274']],
  },
  {
    command: 'convert.octal <permission>',
    describe: 'Returns permission converted to an octal number.',
    examples: [['$0 convert.octal u+r,go+w', 'Output: +0422']],
  },
  {
    command: 'convert.symbolic <permission>',
    describe:
      'Returns permission converted to a symbolic type similar to chmod input.',
    examples: [['$0 convert.symbolic 422', 'Output: u=r,go=w']],
  },
  {
    command: 'convert.stat <permission>',
    describe: 'Returns permission converted to a type similar to stat output.',
    examples: [['$0 convert.stat 422', 'Output: r---w--w-']],
  },
  {
    command: 'convert.object <permission>',
    describe: 'Returns permission converted to an object.',
    examples: [
      [
        '$0 convert.object 422',
        'Output: {"user":{"read":true,"write":false,"execute":false,"setuid":false},"group":{"read":false,"write":true,"execute":false,"setgid":false},"others":{"read":false,"write":true,"execute":false,"sticky":false}}',
      ],
    ],
  },
  {
    command: 'type <permission>',
    describe: "Returns the permission type or 'invalid'.",
    examples: [['$0 type 422', 'Output: octal']],
  },
  {
    command: 'set <permission> [permissions...]',
    describe: 'Returns the result of setting `permissions` on `permission`.',
    examples: [['$0 set a=w a+r', 'Output: a=rw']],
  },
  {
    command: 'contain <permission> <permissions...>',
    describe:
      'Tests whether `permission` includes `permissions`. Returns `true` or `false` or (on the CLI) use the exit code `0` or `1`.',
    examples: [['$0 contain 744 005', 'Exit code: 1']],
  },
  {
    command: 'equal <permission> <permissions...>',
    describe:
      'Tests whether `permission` equals exactly `permissions`. Returns `true` or `false` or (on the CLI) use the exit code `0` or `1`',
    examples: [['$0 equal o+xr o+r,o+x', 'Exit code: 0']],
  },
  {
    command: 'normalize <permission>',
    describe:
      'Normalize a permission to its canonical shape. Use an exit code `1` if permission is invalid.',
    examples: [
      ['$0 normalize u+w,o+w', 'Output: uo+w'],
      ['$0 normalize z+w', 'Exit code: 1'],
    ],
  },
  {
    command: 'positive <permission>',
    describe: 'Only keep the positive permissions.',
    examples: [['$0 positive a=rw', 'Output: a+rw']],
  },
  {
    command: 'not <permission>',
    describe: 'Inverts permission including special permissions',
    examples: [['$0 not 660', 'Output: 7117']],
  },
  {
    command: 'invert <permission>',
    describe: 'Inverts permission and removes special permissions',
    examples: [['$0 invert 660', 'Output: 0117']],
  },
  {
    command: 'min <permission> [permissions...]',
    describe:
      'Retrieve the lowest permissions among all arguments. This does not return the lowest argument. Instead it returns a combination of the lowest bits of all arguments.',
    examples: [['$0 min 744 005', 'Output: 0004']],
  },
  {
    command: 'max <permission> [permissions...]',
    describe:
      'Retrieve the highest permissions among all arguments. This does not return the highest argument. Instead it returns a combination of the highest bits of all arguments.',
    examples: [['$0 max 744 005', 'Output: 0745']],
  },
]
/* eslint-enable max-lines */
