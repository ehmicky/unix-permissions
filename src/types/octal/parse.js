import { parse as parseNumber } from '../number/parse.js'

import { tokenize } from './tokenize.js'
import { OCTAL_BASE, PLUS, MINUS, EQUAL } from './constants.js'

// Parse an `octal` permission to `nodes`
export const parse = function (octal, category) {
  const { operator, string } = tokenize(octal)

  if (string === undefined) {
    return
  }

  const integer = octalToDecimal({ string })
  // Re-use `number` parsing logic
  const nodes = parseNumber(integer)
  // Each operator has its own logic
  const nodesA = parseOperator[operator]({ nodes, category })
  return nodesA
}

// From octal string to decimal integer
const octalToDecimal = function ({ string }) {
  return Number.parseInt(string, OCTAL_BASE)
}

const parsePlus = function ({ nodes }) {
  return nodes.filter(hasAdd)
}

const parseMinus = function ({ nodes }) {
  return nodes.filter(hasAdd).map(invertAdd)
}

const invertAdd = function (node) {
  return { ...node, add: false }
}

const hasAdd = function ({ add }) {
  return add === true
}

// =octal means that some permissions are +, others -
const parseEqual = function ({ nodes }) {
  return nodes
}

const parseOperator = {
  [PLUS]: parsePlus,
  [MINUS]: parseMinus,
  [EQUAL]: parseEqual,
}
