#!/usr/bin/env bash
# Demo of the `invert` method in the terminal (Bash).
# This file can be directly run:
#   - first install `unix-permissions`
#   - then `bash node_modules/unix-permissions/examples/methods/invert.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/unix-permissions

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/../utils.sh"

unix-permissions invert u+xs # u-x

unix-permissions invert u-xs # u+x

unix-permissions invert u=x # u+rw,u-x

unix-permissions invert a=x # a+rw,a-x

unix-permissions invert rws-ws-w- # ---r--r-x

unix-permissions invert 0660 # 0117

unix-permissions invert 1660 # 0117
