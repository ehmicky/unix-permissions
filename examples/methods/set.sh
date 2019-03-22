#!/usr/bin/env bash
# Demo of the `set` command in the terminal (Bash).
# This file can be directly run:
#   - first install `unix-permissions`
#   - then `bash node_modules/unix-permissions/examples/methods/set.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/unix-permissions

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/../utils.sh"

unix-permissions set --------- a+x # --x--x--x

unix-permissions set --------- a+x a+r # r-xr-xr-x

unix-permissions set --x--x--x o-x # --x--x---

unix-permissions set a+x a+r # a+rx

unix-permissions set 4660 a-st # 0660
