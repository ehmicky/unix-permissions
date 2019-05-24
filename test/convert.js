import test from 'ava'

import { convert, normalize } from '../src/main.js'

import { CONVERT_DATA } from './helpers/data/convert.js'

CONVERT_DATA.forEach(({ arg, type, otherType }) => {
  test(`convert() idempotence ${JSON.stringify({ arg, otherType })}`, t => {
    t.deepEqual(normalize(arg), convert[type](convert[otherType](arg)))
  })
})
