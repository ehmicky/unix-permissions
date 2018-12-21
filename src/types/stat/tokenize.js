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

const STAT_REGEXP = /^[-dlpscbD]?([-rwxXsS]{3})([-rwxXsS]{3})([-rwxXtT]{3})$/u

// We cannot know if `-` means `add: false` (must unset bits) or
// `add: undefined` (leave bits as is), so we assume the later.
const removeDashes = function(part) {
  return part.replace(DASH_REGEXP, '')
}

const DASH_REGEXP = /-/gu

const expandSpecial = function(part) {
  return part
    .replace(X_REGEXP, 'x')
    .replace(SMALL_S_REGEXP, 'xs')
    .replace(BIG_S_REGEXP, 's')
    .replace(SMALL_T_REGEXP, 'xt')
    .replace(BIG_T_REGEXP, 't')
}

const X_REGEXP = /X/gu
const BIG_S_REGEXP = /S/gu
const SMALL_S_REGEXP = /s/gu
const BIG_T_REGEXP = /T/gu
const SMALL_T_REGEXP = /t/gu

const contractSpecial = function(part) {
  return part
    .replace(T_REGEXP, 'T')
    .replace(XT_REGEXP, 't')
    .replace(S_REGEXP, 'S')
    .replace(XS_REGEXP, 's')
}

const T_REGEXP = /-t/gu
const XT_REGEXP = /xt/gu
const S_REGEXP = /-s/gu
const XS_REGEXP = /xs/gu

module.exports = {
  tokenize,
  contractSpecial,
}
