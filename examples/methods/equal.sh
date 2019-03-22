#!/usr/bin/env bash
# Demo of the `equal` command in the terminal (Bash).
# This file can be directly run:
#   - first install `unix-permissions`
#   - then `bash node_modules/unix-permissions/examples/methods/equal.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/unix-permissions

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/../utils.sh"

unix-permissions equal --x--x--x a=x
echo $? # 0 (exit code)

unix-permissions equal --x--x--x a+x
echo $? # 1

unix-permissions equal --x--x--x a-x
echo $? # 1

unix-permissions equal --x--x--x a-w
echo $? # 1

unix-permissions equal o+x o+x
echo $? # 0

unix-permissions equal o+x o+x,o+x
echo $? # 0

unix-permissions equal o+x o=w
echo $? # 1

unix-permissions equal o+x,o-w o-w,o+x
echo $? # 0

unix-permissions equal o+x,o-w o-w
echo $? # 1

unix-permissions equal o+x,o-w o+x o-w
echo $? # 1
