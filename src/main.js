import { type } from './type.js'
import { convert } from './converters.js'
import {
  normalize,
  positive,
  contain,
  equal,
  set,
  not,
  invert,
  min,
  max,
 } from './functions/main.js'
import { moizeFuncs } from './moize.js'

// We memoize all exported functions since they:
//  - are all pure and can be
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
