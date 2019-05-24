import { normalize } from '../../src/main.js'

export const normalizeArg = function({ args: [arg], ...datum }) {
  return { ...datum, arg: normalize(arg) }
}

export const removeInvalid = function(data) {
  return data.filter(isValid)
}

const isValid = function({ args: [arg] }) {
  try {
    normalize(arg)
    return true
  } catch {
    return false
  }
}
