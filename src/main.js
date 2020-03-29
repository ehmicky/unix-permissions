import { convert } from './converters.js'
import { contain } from './functions/contain.js'
import { equal } from './functions/equal.js'
import { invert } from './functions/invert.js'
import { min, max } from './functions/min_max.js'
import { normalize } from './functions/normalize.js'
import { not } from './functions/not.js'
import { positive } from './functions/positive.js'
import { set } from './functions/set.js'
import { moizeFuncs } from './moize.js'
// eslint-disable-next-line import/max-dependencies
import { type } from './type.js'

// We memoize all exported functions since they:
//  - are all pure
//  - can be a little CPU-intensive
//  - should not be run with too many different inputs, i.e. memoization should
//    not consume too much memory
const {
  type: mType,
  convert: mConvert,
  normalize: mNormalize,
  positive: mPositive,
  contain: mContain,
  equal: mEqual,
  set: mSet,
  not: mNot,
  invert: mInvert,
  min: mMin,
  max: mMax,
} = moizeFuncs({
  type,
  convert,
  normalize,
  positive,
  contain,
  equal,
  set,
  not,
  invert,
  min,
  max,
})

export {
  mType as type,
  mConvert as convert,
  mNormalize as normalize,
  mPositive as positive,
  mContain as contain,
  mEqual as equal,
  mSet as set,
  mNot as not,
  mInvert as invert,
  mMin as min,
  mMax as max,
}
