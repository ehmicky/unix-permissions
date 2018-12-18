'use strict'

const TYPES = require('./types')
const { getValidType } = require('./type')

const getConverters = function() {
  const convertersA = TYPES.filter(canConvert).map(getConverter)
  return Object.assign({}, ...convertersA)
}

const canConvert = function(type) {
  return type.parse !== undefined && type.serialize !== undefined
}

const getConverter = function({ name }) {
  const converterName = getConverterName({ name })
  const converter = convert.bind(null, name)
  return { [converterName]: converter }
}

const getConverterName = function({ name }) {
  return `to${name[0].toUpperCase()}${name.slice(1)}`
}

const convert = function(type, perm) {
  const tokens = parse(perm)
  const permA = serialize(tokens, type)
  return permA
}

const parse = function(perm) {
  const type = getValidType(perm)
  const tokens = type.parse(perm)
  return tokens
}

const serialize = function(tokens, name) {
  const typeA = TYPES.find(type => type.name === name)
  const perm = typeA.serialize(tokens)
  return perm
}

const converters = getConverters()

module.exports = converters
