export const INVALID_OCTAL = [
  // Invalid
  'NaN',
  '0.5',
  '10000',
  '8',
  '~1',
]

export const OCTAL = [
  // Each permission
  '1',
  '2',
  '4',
  '10',
  '20',
  '40',
  '100',
  '200',
  '400',
  '1000',
  '2000',
  '4000',

  // Extremes
  '0',
  '7777',

  // Combining
  '11',

  // Operators
  '=11',
  '+0',
  '+11',
  '-0',
  '-11',
  '-011',
  '-0o11',

  // Whitespace
  ' 111 ',

  // Prefixes
  '0111',
  '0o111',
  '\\111',
  '\\0111',
]
