'use strict'

const test = require('ava')

const { select, deselect } = require('../localpack')

const {
  PARSE_DATA,
  DESELECT_DATA,
  performTests,
  normalizeArg,
} = require('./helpers')

performTests({
  title: ({ category, type, title }) =>
    `[${type}] should deselect.${category} ${title}`,
  command: ({ category }) => `deselect.${category}`,
  data: DESELECT_DATA,
})

PARSE_DATA.forEach(({ type, args: [arg], title }) => {
  // eslint-disable-next-line max-nested-callbacks
  Object.keys(select).forEach(category => {
    // eslint-disable-next-line max-nested-callbacks
    test(`[${type}] should have idempotent 'select.${category}' and 'deselect.${category}' with ${title}`, t => {
      const argA = normalizeArg({ t, arg })

      if (argA === undefined) {
        return
      }

      const argB = select[category](argA)
      const argC = deselect[category](argB)
      const argD = select[category](argC)
      t.deepEqual(argB, argD)
      const argE = deselect[category](argD)
      t.deepEqual(argC, argE)
    })
  })
})
