// Retrieve a different test name for each iteration
export const getTestName = function(name, { type, otherType, category, title }) {
  const prefix = getPrefix({ type, otherType, category })

  return `${prefix} ${name} with ${title}`
}

const getPrefix = function({ type, otherType, category }) {
  return [type, otherType, category]
    .filter(Boolean)
    .map(addBracket)
    .join(' ')
}

const addBracket = function(name) {
  return `[${name}]`
}
