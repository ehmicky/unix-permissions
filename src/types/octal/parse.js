'use strict'

const { NODES, getNodeKey } = require('../../nodes')
const number = require('../number')

const { tokenize } = require('./tokenize')

const name = 'octal'

const parse = function(octal) {
  const { operator, string } = tokenize(octal)

  if (string === undefined) {
    return
  }

  const integer = octalToDecimal(string)
  const nodes = number.parse(integer)
  const nodesA = parseOperator[operator]({ nodes })
  return nodesA
}

const octalToDecimal = function(string) {
  return Number.parseInt(string, OCTAL_BASE)
}

const OCTAL_BASE = 8

const parsePlus = function({ nodes }) {
  return nodes
}

const parseMinus = function({ nodes }) {
  return nodes.map(revertAdd)
}

const revertAdd = function(node) {
  return { ...node, add: false }
}

const parseEqual = function({ nodes }) {
  const addedNodes = nodes.map(getNodeKey)

  return NODES.map(node => getEqualNode({ node, addedNodes }))
}

const getEqualNode = function({
  node,
  node: { category, permission },
  addedNodes,
}) {
  const nodeKey = getNodeKey(node)
  const add = addedNodes.includes(nodeKey)
  return { category, permission, add }
}

const parseOperator = {
  '+': parsePlus,
  '-': parseMinus,
  '=': parseEqual,
}

module.exports = {
  name,
  parse,
}
