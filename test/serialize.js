const { SERIALIZE_DATA, performTests } = require('./helpers')

performTests({
  title: ({ type, title }) => `[${type}] should serialize ${title}`,
  command: ({ type }) => `convert.${type}`,
  data: SERIALIZE_DATA,
})
