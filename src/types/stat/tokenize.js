'use strict'

const tokenize = function(stat) {
  if (typeof stat !== 'string') {
    return
  }

  const tokens = STAT_REGEXP.exec(stat)

  if (tokens === null) {
    return
  }

  const [u, g, o] = tokens
    .slice(1)
    .map(removeDashes)
    .map(expandSpecial)
  // eslint-disable-next-line id-length
  return { u, g, o }
}

const STAT_REGEXP = /^\s*[-dlpscbD]?\s*([-rwxXsS]{3})\s*([-rwxXsS]{3})\s*([-rwxXtT]{3})\s*$/u

// We cannot know if `-` means `add: false` (must unset bits) or
// `add: undefined` (leave bits as is), so we assume the later.
const removeDashes = function(part) {
  return part.replace(DASH_REGEXP, '')
}

const DASH_REGEXP = /-/gu

const expandSpecial = function(part) {
  return EXPAND_REGEXPS.reduce(specialReduce, part)
}

const EXPAND_REGEXPS = [
  [/X/gu, 'x'],
  [/s/gu, 'xs'],
  [/S/gu, 's'],
  [/t/gu, 'xt'],
  [/T/gu, 't'],
]

const contractSpecial = function(part) {
  return CONTRACT_REGEXPS.reduce(specialReduce, part)
}

const CONTRACT_REGEXPS = [
  [/-t/gu, 'T'],
  [/xt/gu, 't'],
  [/-s/gu, 'S'],
  [/xs/gu, 's'],
]

const specialReduce = function(part, [regexp, chars]) {
  return part.replace(regexp, chars)
}

module.exports = {
  tokenize,
  contractSpecial,
}
