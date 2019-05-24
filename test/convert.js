import test from 'ava'

import { convert, normalize } from '../src/main.js'

import { CONVERT_DATA } from './helpers/data/convert.js'

CONVERT_DATA.forEach(({ args: [arg], type, otherType }) => {
  test(`should have idempotent 'convert' ${otherType} ${JSON.stringify(
    arg,
  )}`, t => {
    t.deepEqual(normalize(arg), convert[type](convert[otherType](arg)))
  })
})
