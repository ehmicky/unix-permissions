'use strict'

const { SELECT_DATA, performTests } = require('./helpers')

performTests({
  title: ({ category, type, title }) =>
    `[${type}] should select.${category} ${title}`,
  command: ({ category }) => `select.${category}`,
  data: SELECT_DATA,
})
