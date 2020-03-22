// Tokenize `symbolic` string using a RegExp
export const tokenize = function (symbolic) {
  if (typeof symbolic !== 'string') {
    return
  }

  const tokens = symbolic.split(COMMA_REGEXP).map(tokenizePart)

  const isMatching = tokens.every((token) => token !== undefined)

  if (!isMatching) {
    return
  }

  return tokens
}

// Allow whitespaces around commas
const COMMA_REGEXP = /\s*,\s*/gu

// Tokenize each `symbolic` comma-separated group
const tokenizePart = function (part) {
  const parts = PART_REGEXP.exec(part)

  if (parts === null) {
    return
  }

  const [, categories, operator, permissions] = parts
  return { categories, operator, permissions }
}

// Symbolic permission comma-separated group, e.g. `a=rw`
// Allow trailing whitespaces.
// The category are a string composed of `a`, `u`, `g` or `o`, and defaults
// to `a`.
// The operator can be `=`, `+` or `-`, and is required.
// The permissions are a string composed of `xwrXst`, and defaults to ''.
const PART_REGEXP = /^\s*([augo]*)\s*([=+-])\s*([xwrXst]*)\s*$/u
