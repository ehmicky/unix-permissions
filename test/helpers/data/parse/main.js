import { forEachDataType } from '../repeat.js'

import { octal } from './octal.js'
import { number } from './number.js'
import { stat } from './stat.js'
import { symbolic } from './symbolic.js'
import { object } from './object.js'

export const PARSE_DATA = forEachDataType({
  number,
  octal,
  stat,
  symbolic,
  object,
})
