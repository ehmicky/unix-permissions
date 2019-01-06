'use strict'

const { select, deselect } = require('../localpack')

const {
  SELECT_DATA,
  DESELECT_DATA,
  performTests,
  performChecks,
} = require('./helpers')

performTests({
  title: ({ category, type, title }) =>
    `[${type}] should deselect.${category} ${title}`,
  command: ({ category }) => `deselect.${category}`,
  data: DESELECT_DATA,
})

const check = function({ t, arg, category }) {
  const argA = select[category](arg)
  const argB = deselect[category](argA)
  const argC = select[category](argB)
  const argD = deselect[category](argC)
  t.deepEqual(argA, argC)
  t.deepEqual(argB, argD)
}

performChecks({
  name: "should have idempotent 'select' and 'deselect'",
  data: SELECT_DATA,
  check,
})
