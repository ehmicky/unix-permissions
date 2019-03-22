#!/usr/bin/env bash
# Demo of the `symbolic` permission type in the terminal (Bash).
# This file can be directly run:
#   - first install `unix-permissions`
#   - then `bash node_modules/unix-permissions/examples/types/symbolic.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/unix-permissions

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/../utils.sh"

unix-permissions convert.octal o+wx # +0003

unix-permissions convert.octal o=wx # 0003

unix-permissions convert.octal o-wx # -0003

unix-permissions convert.octal go+x # +0011

unix-permissions convert.octal g+x,o+x # +0011

unix-permissions convert.octal a+x # +0111

unix-permissions convert.octal +x # +0111

unix-permissions convert.octal a+s # +6000

unix-permissions convert.octal o+ # +0000
