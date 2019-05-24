import { normalize } from '../../src/main.js'

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
