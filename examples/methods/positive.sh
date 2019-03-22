#!/usr/bin/env bash
# Demo of the `positive` command in the terminal (Bash).
# This file can be directly run:
#   - first install `unix-permissions`
#   - then `bash node_modules/unix-permissions/examples/methods/positive.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/unix-permissions

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/../utils.sh"

unix-permissions positive o+x,o-rw # o+x

unix-permissions positive o=x # o+x

unix-permissions positive 660 # +0660

unix-permissions invert 660 # 0117

unix-permissions invert $(unix-permissions positive 660) # -0660
