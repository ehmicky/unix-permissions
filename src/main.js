'use strict'

const { umask } = require('process')

const set = function(flags) {
  umask(flags)
}

const get = function() {
  return umask()
}

const test = function(flags) {
  return umask() === flags
}

module.exports = {
  set,
  get,
  test,
}
