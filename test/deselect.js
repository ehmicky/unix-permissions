'use strict'

const { DESELECT_DATA, performTests } = require('./helpers')

performTests({
  data: DESELECT_DATA,
  title: ({ category, type, title }) =>
    `[${type}] should deselect.${category} ${title}`,
  command: ({ category }) => `deselect.${category}`,
})
