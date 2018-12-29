'use strict'

const { SERIALIZE_DATA, performTests } = require('./helpers')

performTests({
  data: SERIALIZE_DATA,
  title: ({ type, title }) => `[${type}] should serialize ${title}`,
  command: ({ type }) => `convert.${type}`,
})
