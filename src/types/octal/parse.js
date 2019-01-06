'use strict'

const { EMPTY_NODES_MAP, getNodesMap } = require('../../nodes')
const number = require('../number')

const { tokenize } = require('./tokenize')
const {
  OCTAL_BASE,
  OPERATORS: { PLUS, MINUS, EQUAL },
} = require('./constants')

// Parse an `octal` permission to `nodes`
const parsePerm = function(funcName, octal, category) {
  const { operator, string } = tokenize({ octal, funcName })

  if (string === undefined) {
    return
  }

  const integer = octalToDecimal(string)
  // Re-use `number` parsing logic
  const nodes = number[funcName](integer)
  // Each operator has its own logic
  const nodesA = parseOperator[funcName][operator]({ nodes, category })
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
  return add === true
}

// =octal means that some permissions are +, others -
const parseEqual = function({ nodes }) {
  return nodes
}

// With `parseCategory` we need to fill all possible nodes, otherwise
// `deselect()` might serialize to operator `+` or `-`
const parseCategoryEqual = function({ nodes, category }) {
  const nodesA = nodes.map(node => ({ ...node, category }))
  const nodesMap = getNodesMap(nodesA)
  const nodesMapA = { ...EMPTY_NODES_MAP, ...nodesMap }
  const nodesB = Object.values(nodesMapA)
  return nodesB
}

const parseOperator = {
  parse: {
    [PLUS]: parsePlus,
    [MINUS]: parseMinus,
    [EQUAL]: parseEqual,
  },
  parseCategory: {
    [PLUS]: parsePlus,
    [MINUS]: parseMinus,
    [EQUAL]: parseCategoryEqual,
  },
}

const parse = parsePerm.bind(null, 'parse')
const parseCategory = parsePerm.bind(null, 'parseCategory')

module.exports = {
  parse,
  parseCategory,
}
