#!/usr/bin/env bash
# Demo of the `contain` method in the terminal (Bash).
# This file can be run in a terminal with the following commands:
#
#   npm install unix-permissions
#   bash node_modules/unix-permissions/examples/methods/contain.sh
#
# An online demo is also available at:
#   https://repl.it/@ehmicky/unix-permissions

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/../utils.sh"

unix-permissions contain --x--x--x a=x
echo $? # 0 (exit code)

unix-permissions contain --x--x--x a+x
echo $? # 0

unix-permissions contain --x--x--x a-x
echo $? # 1

unix-permissions contain --x--x--x a-w
echo $? # 0

unix-permissions contain o+x o+x
echo $? # 0

unix-permissions contain o+x o+x,o+x
echo $? # 0

unix-permissions contain o+x o=w
echo $? # 1

unix-permissions contain o+x,o-w o-w,o+x
echo $? # 0

unix-permissions contain o+x,o-w o-w
echo $? # 0

unix-permissions contain o+x,o-w o+x o-w
echo $? # 0
