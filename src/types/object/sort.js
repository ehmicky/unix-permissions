// Ensure object keys order
export const compareNodes = (nodeA, nodeB) => {
  const result = sortCategory(nodeA, nodeB)

  if (result !== 0) {
    return result
  }

  return sortPerm(nodeA, nodeB)
}

const sort = ({ attrName, order }, nodeA, nodeB) => {
  if (nodeA[attrName] === nodeB[attrName]) {
    return 0
  }

  return order.indexOf(nodeA[attrName]) > order.indexOf(nodeB[attrName])
    ? 1
    : -1
}

const CATEGORY_ORDER = ['user', 'group', 'others', 'special']
const PERM_ORDER = ['read', 'write', 'execute', 'setuid', 'setgid', 'sticky']

const sortCategory = sort.bind(undefined, {
  attrName: 'category',
  order: CATEGORY_ORDER,
})
const sortPerm = sort.bind(undefined, {
  attrName: 'permission',
  order: PERM_ORDER,
})
