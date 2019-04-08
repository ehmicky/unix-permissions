import { SERIALIZE_DATA, performTests } from './helpers.js'

performTests({
  title: ({ type, title }) => `[${type}] should serialize ${title}`,
  command: ({ type }) => `convert.${type}`,
  data: SERIALIZE_DATA,
})
