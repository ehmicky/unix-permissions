'use strict'

const { SELECT_DATA, performTests } = require('./helpers')

performTests({
  data: SELECT_DATA,
  title: ({ category, type, title }) =>
    `[${type}] should select.${category} ${title}`,
  command: ({ category }) => `select.${category}`,
})
