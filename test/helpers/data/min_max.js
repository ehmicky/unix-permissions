const MIN_MAX_DATA = [
  // Each operators combination
  ['o+x', 'o+x'],
  ['o+x', 'o+'],
  ['o+x', 'o-x'],
  ['o+', 'o+x'],
  ['o+', 'o+'],
  ['o+', 'o-x'],
  ['o-', 'o+x'],
  ['o-', 'o+'],
  ['o-', 'o-x'],

  // Special permission
  ['o+t', 'o-t'],
  ['g+s', 'g-s'],
  ['u+s', 'u-s'],

  // Combining
  ['o+x,g-x', 'o-x,g+x'],
  ['o=x', 'o=r'],
  ['a=xrw', 'a=st'],

  // Several values
  ['o-x', 'o+', 'o+x'],
  ['o+x', 'o+', 'o-x'],

  // Fewer values
  ['o+x'],
  [],
]

module.exports = {
  MIN_MAX_DATA,
}
