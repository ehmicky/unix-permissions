'use strict'

const number = require('../number')

const { tokenize } = require('./tokenize')
const {
  OCTAL_BASE,
  OPERATORS: { PLUS, MINUS, EQUAL },
} = require('./constants')

// Parse an `octal` permission to `nodes`
const parsePerm = function(funcName, octal) {
  const { operator, string } = tokenize({ octal, funcName })

  if (string === undefined) {
    return
  }

  const integer = octalToDecimal(string)
  // Re-use `number` parsing logic
  const nodes = number[funcName](integer)
  // Each operator has its own logic
  const nodesA = parseOperator[operator]({ nodes })
  return nodesA
}

// From octal string to decimal integer
const octalToDecimal = function(string) {
  return Number.parseInt(string, OCTAL_BASE)
}

const parsePlus = function({ nodes }) {
  return nodes.filter(hasAdd)
}

const parseMinus = function({ nodes }) {
  return nodes.filter(hasAdd).map(invertAdd)
}

const invertAdd = function(node) {
  return { ...node, add: false }
}

const hasAdd = function({ add }) {
  return add
}

// =octal means that some permissions are +, others -
const parseEqual = function({ nodes }) {
  return nodes
}

const parseOperator = {
  [PLUS]: parsePlus,
  [MINUS]: parseMinus,
  [EQUAL]: parseEqual,
}

const parse = parsePerm.bind(null, 'parse')
const parseCategory = parsePerm.bind(null, 'parseCategory')

module.exports = {
  parse,
  parseCategory,
}
