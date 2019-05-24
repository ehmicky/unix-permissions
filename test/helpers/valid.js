import { normalize } from '../../src/main.js'

export const isValid = function({ args: [arg] }) {
  try {
    normalize(arg)
    return true
  } catch {
    return false
  }
}
