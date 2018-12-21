'use strict'

const tokenize = function(symbolic) {
  if (typeof symbolic !== 'string') {
    return
  }

  const tokens = symbolic.split(COMMA_REGEXP).map(tokenizePart)

  const isMatching = tokens.every(token => token !== undefined)

  if (!isMatching) {
    return
  }

  return tokens
}

const COMMA_REGEXP = /\s*,\s*/gu

const tokenizePart = function(part) {
  const parts = PART_REGEXP.exec(part)

  if (parts === null) {
    return
  }

  const [, categories, operator, permissions] = parts
  return { categories, operator, permissions }
}

const PART_REGEXP = /^\s*([augo]*)\s*([=+-]?)\s*([xwrXst]*)\s*$/u

module.exports = {
  tokenize,
}
