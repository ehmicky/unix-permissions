import { NODES } from '../../constants.js'
import { hasDuplicate } from '../../utils.js'

import { tokenize } from './tokenize.js'

// Parse a `stat` permission to `nodes`
export const parse = (stat) => {
  const tokens = tokenize(stat)

  if (tokens === undefined || hasDuplicates({ tokens })) {
    return
  }

  return NODES.map((node) => parseNode({ node, tokens }))
}

// We do not allow duplicates within a category as it indicates typos
const hasDuplicates = ({ tokens }) =>
  Object.values(tokens).some(hasDuplicateChars)

const hasDuplicateChars = (string) => hasDuplicate([...string])

// Parse a `stat` character to a single `node`
const parseNode = ({ node, node: { category }, tokens }) => {
  const part = tokens[category]
  return parsePart({ node, part })
}

const parsePart = ({ node, node: { permission }, part }) => {
  const add = part.includes(permission)
  return { ...node, add }
}
