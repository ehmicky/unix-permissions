'use strict'

const name = 'stat'

const test = function(stat) {
  if (typeof stat !== 'string') {
    return false
  }

  const tokens = STAT_REGEXP.exec(stat)

  if (tokens === null) {
    return false
  }

  return !tokens
    .slice(1)
    .map(replaceSpecial)
    .some(hasDuplicates)
}

const replaceSpecial = function(part) {
  return part
    .replace(X_REGEXP, 'x')
    .replace(BIG_S_REGEXP, 's')
    .replace(SMALL_S_REGEXP, 'xs')
    .replace(BIG_T_REGEXP, 't')
    .replace(SMALL_T_REGEXP, 'xt')
}

const STAT_REGEXP = /^[-dlpscbD]?([-rwxXsS]{3})([-rwxXsS]{3})([-rwxXtT]{3})$/u
const X_REGEXP = /X/gu
const BIG_S_REGEXP = /S/gu
const SMALL_S_REGEXP = /s/gu
const BIG_T_REGEXP = /T/gu
const SMALL_T_REGEXP = /t/gu

const hasDuplicates = function(string) {
  return string.split('').some(isDuplicate)
}

const isDuplicate = function(char, index, chars) {
  return chars.slice(index + 1).some(charB => char === charB)
}

// eslint-disable-next-line no-unused-vars, no-empty-function
const parse = function(stat) {}

const serialize = function(tokens) {
  return tokens
}

module.exports = {
  name,
  test,
  parse,
  serialize,
}
