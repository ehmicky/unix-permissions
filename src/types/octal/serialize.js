import { NODES_MAP } from '../../nodes.js'
import { serialize as serializeNumber } from '../number/serialize.js'

import { MINUS, NONE, OCTAL_BASE, PLUS } from './constants.js'

// Serialize from `nodes` to a `octal` permission
export const serialize = (nodes) => {
  const operator = serializeOperator({ nodes })
  const string = serializeInteger({ operator, nodes })
  const octal = `${operator}${string}`
  return octal
}

// `octal` can be prefixed with `-` or `+` if partial and only negative|positive
// `=` is the default operator, i.e. is never serialized.
const serializeOperator = ({ nodes }) => {
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

const isPartial = ({ nodes }) =>
  Object.keys(nodes).length !== Object.keys(NODES_MAP).length

const isAdded = ({ add }) => add === true

const isRemoved = ({ add }) => add === false

// Re-use `number` serialization logic, then stringify to an octal number
const serializeInteger = ({ operator, nodes }) => {
  const nodesA = serializeMinus({ operator, nodes })
  const integer = serializeNumber(nodesA)
  // Always serialize to 4 characters (with leading 0s)
  const string = integer
    .toString(OCTAL_BASE)
    .padStart(SERIALIZE_LENGTH, SERIALIZE_PAD)
  return string
}

const SERIALIZE_LENGTH = 4
const SERIALIZE_PAD = '0'

// When using `-octal`, we need the inverse number
const serializeMinus = ({ operator, nodes }) => {
  if (operator !== MINUS) {
    return nodes
  }

  return nodes.map((node) => ({ ...node, add: true }))
}
