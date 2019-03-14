#!/usr/bin/env node
'use strict'

const { convert, positive } = require('../build/src')

const resultA = convert.symbolic('111') // 'a=x'

const resultB = positive(convert.symbolic('111')) // 'a+x'

const resultC = convert.octal('o+x') // '+0001'

const resultD = convert.octal('o=x') // '0001'

console.log(resultA)
console.log(resultB)
console.log(resultC)
console.log(resultD)
