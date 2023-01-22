const { ok } = require('node:assert')

const exported = require('.')

ok(exported && typeof exported === 'object', 'named exports are exported')
ok(typeof exported.equal === 'function', 'function "equal" is exported')
ok(
  exported.convert && typeof exported.convert === 'object',
  'object "convert" is exported',
)
ok(
  typeof exported.convert.number === 'function',
  'function "number" is exported',
)
