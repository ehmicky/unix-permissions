'use strict'

const { isPlainObject } = require('../../utils')
const { PARSE_CONSTANTS } = require('../../nodes')

const name = 'object'

const parse = function(object) {
  if (!isPlainObject(object)) {
    return
  }

  const nodes = Object.entries(object).flatMap(parsePermissions)

  if (!validateNodes({ nodes })) {
    return
  }

  return nodes
}

const parsePermissions = function([category, permissions]) {
  const parseConstant = PARSE_CONSTANTS[category]

  if (parseConstant === undefined) {
    return
  }

  return Object.entries(permissions)
    .filter(hasDefinedValue)
    .map(([permission, add]) =>
      parsePermission({ permission, add, parseConstant }),
    )
}

const hasDefinedValue = function([, value]) {
  return value !== undefined
}

const parsePermission = function({
  permission,
  add,
  parseConstant: { category, permissions },
}) {
  const permissionA = permissions[permission]

  if (permissionA === undefined) {
    return
  }

  return { category, permission: permissionA, add }
}

const validateNodes = function({ nodes }) {
  return nodes.every(validateNode)
}

const validateNode = function(node) {
  return node !== undefined
}

module.exports = {
  name,
  parse,
}
