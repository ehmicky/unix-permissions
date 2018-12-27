'use strict'

const {
  DEFAULT_OPERATOR,
  OPERATORS: { NONE },
} = require('./constants')

const tokenize = function({ octal, funcName }) {
  if (typeof octal !== 'string') {
    return {}
  }

  const tokens = OCTAL_REGEXP[funcName].exec(octal)

  if (tokens === null) {
    return {}
  }

  const [, operator, string] = tokens

  const operatorA = addDefaultOperator({ operator })
  return { operator: operatorA, string }
}

const OCTAL_REGEXP = {
  parse: /^\s*([=+-]?)\\?0?[oO]?([0-7]{1,4})\s*$/u,
  parseCategory: /^\s*([=+-]?)\\?0?[oO]?([0-7])\s*$/u,
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
