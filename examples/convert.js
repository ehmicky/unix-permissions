#!/usr/bin/env node
'use strict'

/* eslint-disable no-inline-comments, line-comment-position, no-console, no-restricted-globals */
const { convert, positive } = require('../build/src')

const resultA = convert.symbolic('111') // 'a=x'

const resultB = positive(convert.symbolic('111')) // 'a+x'

const resultC = convert.octal('o+x') // '+0001'

const resultD = convert.octal('o=x') // '0001'

console.log(resultA)
console.log(resultB)
console.log(resultC)
console.log(resultD)
// eslint-disable-next-line max-len
/* eslint-enable no-inline-comments, line-comment-position, no-console, no-restricted-globals */
