#!/usr/bin/env bash
# Demo of the `type` command in the terminal (Bash).
# This file can be directly run:
#   - first install `unix-permissions`
#   - then `bash node_modules/unix-permissions/examples/methods/type.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/unix-permissions

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/../utils.sh"

unix-permissions type 1 # octal

unix-permissions type a+x # symbolic

unix-permissions type a+i # invalid
