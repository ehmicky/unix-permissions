import { convert } from '../../../src/main.js'

export const forEachDataType = function(allData) {
  return Object.entries(allData).flatMap(([type, data]) =>
    data.map(arg => ({ type, args: [arg], title: stringify(arg) }))
  )
}

const stringify = function(arg) {
  if (typeof arg !== 'object') {
    return String(arg)
  }

  return JSON.stringify(arg)
}

export const forEachSType = function(data) {
  return Object.keys(convert).flatMap(type =>
    data.map(arg => ({ type, args: [arg], title: arg }))
  )
}

export const forEachType = function(data) {
  return Object.keys(convert).flatMap(otherType =>
    data.map(args => ({ ...args, otherType }))
  )
}
