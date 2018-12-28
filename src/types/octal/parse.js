'use strict'

const { NODES_MAP, getNodesMap } = require('../../nodes')
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
  return nodes
}

const parseMinus = function({ nodes }) {
  return nodes.map(invertAdd)
}

const invertAdd = function(node) {
  return { ...node, add: false }
}

// =octal means that some permissions are +, others -
const parseEqual = function({ nodes }) {
  const nodesMap = getNodesMap(nodes)

  return Object.entries(NODES_MAP).map(([nodeKey, node]) =>
    getEqualNode({ node, nodeKey, nodesMap }),
  )
}

const getEqualNode = function({
  node: { category, permission },
  nodeKey,
  nodesMap,
}) {
  const add = nodesMap[nodeKey] !== undefined
  return { category, permission, add }
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
