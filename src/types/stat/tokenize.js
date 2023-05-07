// Tokenize a `stat` string using a RegExp
export const tokenize = (stat) => {
  if (typeof stat !== 'string') {
    return
  }

  const tokens = STAT_REGEXP.exec(stat)

  if (tokens === null) {
    return
  }

  // eslint-disable-next-line id-length
  const [u, g, o] = tokens.slice(1).map(removeDashes).map(expandSpecial)
  // eslint-disable-next-line id-length
  return { u, g, o }
}

// Matches a `stat` permission, e.g. `---rwx-wx`
// Allow trailing whitespaces, or whitespaces between group.
// Each permission can either be `-` `r` `w` or `x`.
// Special permissions are also allowed `s`, `S`, `t`, `T` but only within
// the correct category.
// `X` permission is allowed.
// File type as a first character is allowed and optional.
// Each group must have 3 characters, and not have duplicates.
const STAT_REGEXP =
  /^\s*[-dlpscbD]?\s*([-rwxXsS]{3})\s*([-rwxXsS]{3})\s*([-rwxXtT]{3})\s*$/u

// We cannot know if `-` means `add: false` (must unset bits) or
// `add: undefined` (leave bits as is), so we assume the later.
const removeDashes = (part) => part.replaceAll('-', '')

// Special permissions have an uppercase and lowercase depending on whether
// `x` exists.
// `X` permission is a special permission according to chmod behavior.
// It is the same as `x` except it is a noop if no categories has `x`.
// At the moment, we do not support this, so it's just an alias for `x`.
const expandSpecial = (part) => EXPAND_REGEXPS.reduce(specialReduce, part)

// Array order matters. E.g. if S -> s was before s -> xs, it would not work
const EXPAND_REGEXPS = [
  [/X/gu, 'x'],
  [/s/gu, 'xs'],
  [/S/gu, 's'],
  [/t/gu, 'xt'],
  [/T/gu, 't'],
]

// Inverse of `expandSpecial()`
export const contractSpecial = (part) =>
  CONTRACT_STRINGS.reduce(specialReduce, part)

const CONTRACT_STRINGS = [
  ['-t', 'T'],
  ['xt', 't'],
  ['-s', 'S'],
  ['xs', 's'],
]

const specialReduce = (part, [before, after]) => part.replaceAll(before, after)
