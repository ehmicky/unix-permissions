import { normalize } from '../../src/main.js'

export const normalizeData = function(data) {
  return data.map(normalizeArg).filter(value => value !== undefined)
}

const normalizeArg = function({ args: [arg], ...datum }) {
  try {
    const argA = normalize(arg)
    return { ...datum, arg: argA }
  } catch {}
}
