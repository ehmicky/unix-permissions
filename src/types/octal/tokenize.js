import {
  DEFAULT_OPERATOR,
  OPERATORS: { NONE },
} from './constants.js'

// Tokenize an `octal` string using a regExp
const tokenize = function(octal) {
  if (typeof octal !== 'string') {
    return {}
  }

  const tokens = OCTAL_REGEXP.exec(octal)

  if (tokens === null) {
    return {}
  }

  const [, operator, string] = tokens

  const operatorA = addDefaultOperator({ operator })
  return { operator: operatorA, string }
}

// Matches octal numbers with 1 to 4 digits, e.g. `544`
// Allow trailing whitespaces
// Can be prefixed with a backslash, a leading 0 and/or an `o`
// Can be prefixed with an operator = - or +, e.g. `=544`
const OCTAL_REGEXP = /^\s*([=+-]?)\\?0?[oO]?([0-7]{1,4})\s*$/u

// '022' is same as '+022' (to match chmod behavior)
const addDefaultOperator = function({ operator }) {
  if (operator === NONE) {
    return DEFAULT_OPERATOR
  }

  return operator
}

module.exports = {
  tokenize,
}
