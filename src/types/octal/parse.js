import { parse as parseNumber } from '../number/parse.js'

import { EQUAL, MINUS, OCTAL_BASE, PLUS } from './constants.js'
import { tokenize } from './tokenize.js'

// Parse an `octal` permission to `nodes`
export const parse = (octal, category) => {
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
const octalToDecimal = ({ string }) => Number.parseInt(string, OCTAL_BASE)

const parsePlus = ({ nodes }) => nodes.filter(hasAdd)

const parseMinus = ({ nodes }) => nodes.filter(hasAdd).map(invertAdd)

const invertAdd = (node) => ({ ...node, add: false })

const hasAdd = ({ add }) => add === true

// =octal means that some permissions are +, others -
const parseEqual = ({ nodes }) => nodes

const parseOperator = {
  [PLUS]: parsePlus,
  [MINUS]: parseMinus,
  [EQUAL]: parseEqual,
}
