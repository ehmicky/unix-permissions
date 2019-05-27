// Snapshot a command's output
export const testCommand = function({ args, command, t }) {
  t.snapshot(command(...args))
}
