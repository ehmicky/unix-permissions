import { exit } from 'node:process'

// Print stringified output.
// For test functions like `contain()`, we use exit code 0|1 instead.
export const handleOutput = function ({ output }) {
  if (output === true) {
    exit()
  }

  if (output === false) {
    exit(1)
  }

  const outputA = typeof output === 'string' ? output : JSON.stringify(output)

  console.log(outputA)
}
