// Make sure exceptions are snapshot as well
export const stringifyErrors = function(func) {
  return addErrorHandler(func, String)
}

// Wrap a function with a error handler
const addErrorHandler = function(func, errorHandler) {
  return errorHandledFunc.bind(null, func, errorHandler)
}

const errorHandledFunc = function(func, errorHandler, ...args) {
  try {
    return func(...args)
  } catch (error) {
    return errorHandler(error, ...args)
  }
}
