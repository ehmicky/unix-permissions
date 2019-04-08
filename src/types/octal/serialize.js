import { NODES_MAP } from '../../nodes.js'
import number from '../number.js'

import {
  OCTAL_BASE,
  SERIALIZE_LENGTH,
  SERIALIZE_PAD,
  OPERATORS: { PLUS, MINUS, NONE },
} from './constants.js'

// Serialize from `nodes` to a `octal` permission
export const serialize = function(nodes) {
  const operator = serializeOperator({ nodes })
  const string = serializeInteger({ operator, nodes })
  const octal = `${operator}${string}`
  return octal
}

// `octal` can be prefixed with `-` or `+` if partial and only negative|positive
// `=` is the default operator, i.e. is never serialized.
const serializeOperator = function({ nodes }) {
  if (!isPartial({ nodes })) {
    return NONE
  }

  if (nodes.every(isAdded)) {
    return PLUS
  }

  if (nodes.every(isRemoved)) {
    return MINUS
  }

  return NONE
}

const isPartial = function({ nodes }) {
  return Object.keys(nodes).length !== Object.keys(NODES_MAP).length
}

const isAdded = function({ add }) {
  return add === true
}

const isRemoved = function({ add }) {
  return add === false
}

// Re-use `number` serialization logic, then stringify to an octal number
const serializeInteger = function({ operator, nodes }) {
  const nodesA = serializeMinus({ operator, nodes })
  const integer = number.serialize(nodesA)
  // Always serialize to 4 characters (with leading 0s)
  const string = integer
    .toString(OCTAL_BASE)
    .padStart(SERIALIZE_LENGTH, SERIALIZE_PAD)
  return string
}

// When using `-octal`, we need the inverse number
const serializeMinus = function({ operator, nodes }) {
  if (operator !== MINUS) {
    return nodes
  }

  return nodes.map(node => ({ ...node, add: true }))
}
