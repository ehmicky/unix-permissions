#!/usr/bin/env bash
# Demo of the `stat` permission type in the terminal (Bash).
# This file can be directly run:
#   - first install `unix-permissions`
#   - then `bash node_modules/unix-permissions/examples/types/stat.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/unix-permissions

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/../utils.sh"

unix-permissions convert.octal --------x # 0001

unix-permissions convert.octal --x--x--x # 0111

unix-permissions convert.octal --------T # 1000

unix-permissions convert.octal --------t # 1001

unix-permissions convert.octal d--------x # 0001

unix-permissions convert.octal '--x --x --x' # 0111

unix-permissions convert.octal 'rwx --- ---' # 0700

unix-permissions convert.octal 'xwr --- ---' # 0700
