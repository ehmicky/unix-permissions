'use strict'

const {
  DEFAULT_OPERATOR,
  OPERATORS: { NONE },
} = require('./constants')

const tokenize = function({ octal, funcName }) {
  if (typeof octal !== 'string') {
    return {}
  }

  const tokens = OCTAL_REGEXP[funcName].exec(octal.trim())

  if (tokens === null) {
    return {}
  }

  const [, operator, string] = tokens

  const operatorA = addDefaultOperator({ operator })
  return { operator: operatorA, string }
}

const OCTAL_REGEXP = {
  parse: /^([=+-]?)\\?0?[oO]?([0-7]{1,4})$/gu,
  parseCategory: /^([=+-]?)\\?0?[oO]?([0-7])$/gu,
}

const addDefaultOperator = function({ operator }) {
  if (operator === NONE) {
    return DEFAULT_OPERATOR
  }

  return operator
}

module.exports = {
  tokenize,
}
