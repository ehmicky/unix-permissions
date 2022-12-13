import { convert as convertValue } from './helpers.js'
import { TYPES_MAP } from './types/main.js'
import { mapValues } from './utils.js'

// Retrieve a map of all types' conversion functions
const getConverters = () => mapValues(TYPES_MAP, getConverter)

const getConverter = (type, name) => convertValue.bind(undefined, name)

export const convert = getConverters()
