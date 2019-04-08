import { performTests } from './helpers/command.js'
import { SERIALIZE_DATA } from './helpers/data/serialize.js'

performTests({
  title: ({ type, title }) => `[${type}] should serialize ${title}`,
  command: ({ type }) => `convert.${type}`,
  data: SERIALIZE_DATA,
})
