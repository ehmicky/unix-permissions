'use strict'

const { DESELECT_DATA, performTests } = require('./helpers')

performTests({
  title: ({ category, type, title }) =>
    `[${type}] should deselect.${category} ${title}`,
  command: ({ category }) => `deselect.${category}`,
  data: DESELECT_DATA,
})
