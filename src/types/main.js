import { parse as parseNumber } from './number/parse.js'
import { serialize as serializeNumber } from './number/serialize.js'
import { parse as parseOctal } from './octal/parse.js'
import { serialize as serializeOctal } from './octal/serialize.js'
import { parse as parseStat } from './stat/parse.js'
import { serialize as serializeStat } from './stat/serialize.js'
import { parse as parseSymbolic } from './symbolic/parse.js'
import { serialize as serializeSymbolic } from './symbolic/serialize.js'
import { parse as parseObject } from './object/parse.js'
import { serialize as serializeObject } from './object/serialize.js'

const number = { parse: parseNumber, serialize: serializeNumber }
const octal = { parse: parseOctal, serialize: serializeOctal }
const stat = { parse: parseStat, serialize: serializeStat }
const symbolic = { parse: parseSymbolic, serialize: serializeSymbolic }
const object = { parse: parseObject, serialize: serializeObject }

// Order is significant, because each is tried in order
export const TYPES = [number, octal, stat, symbolic, object]

// Object keys are significant
export const TYPES_MAP = { number, octal, stat, symbolic, object }
