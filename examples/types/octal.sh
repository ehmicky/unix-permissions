#!/usr/bin/env bash
# Demo of the `octal` permission type in the terminal (Bash).
# This file can be directly run:
#   - first install `unix-permissions`
#   - then `bash node_modules/unix-permissions/examples/types/octal.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/unix-permissions

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/../utils.sh"

unix-permissions convert.stat 720 # rwx-w----

unix-permissions convert.stat 7000 # --S--S--T

unix-permissions convert.stat \\720 # rwx-w----

unix-permissions convert.stat 0720 # rwx-w----

unix-permissions convert.stat 0o720 # rwx-w----

unix-permissions convert.symbolic +720 # u+rwx,g+w

unix-permissions convert.symbolic -720 # u-rwx,g-w

unix-permissions convert.symbolic =720 # u=rwx,g=w,o=
