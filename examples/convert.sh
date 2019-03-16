#!/usr/bin/env bash
# This example demonstrates the `convert` command in the terminal (Bash).
# This file can be directly run:
#   - first install `unix-permissions`
#   - then `bash node_modules/unix-permissions/examples/convert.sh`

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/utils.sh"

unix-permissions convert.symbolic 111 # a=x

unix-permissions positive $(unix-permissions convert.symbolic 111) # a+x

unix-permissions convert.octal o+x # +0001

unix-permissions convert.octal o=x # 0001
