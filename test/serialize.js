import { performTest } from './helpers/command.js'
import { SERIALIZE_DATA } from './helpers/data/serialize.js'

SERIALIZE_DATA.forEach(datum => {
  performTest({
    title: ({ type, title }) => `[${type}] should serialize ${title}`,
    command: ({ type }) => `convert.${type}`,
    datum,
  })
})
