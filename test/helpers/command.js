// Snapshot a command's output, then test it has the same behavior when fired
// from CLI.
export const testCommand = function({ args, command, t }) {
  const output = fireCommand({ command, args })
  t.snapshot(output)
}

// Fire command programmatically
const fireCommand = function({ command, args }) {
  try {
    return command(...args)
  } catch (error) {
    return String(error)
  }
}
