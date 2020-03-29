import { number } from './number/main.js'
import { object } from './object/main.js'
import { octal } from './octal/main.js'
import { stat } from './stat/main.js'
import { symbolic } from './symbolic/main.js'

// Order is significant, because each is tried in order
export const TYPES = [number, octal, stat, symbolic, object]

// Object keys are significant
export const TYPES_MAP = { number, octal, stat, symbolic, object }
