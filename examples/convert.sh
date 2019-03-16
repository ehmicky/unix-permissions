#!/usr/bin/env bash
# This example demonstrates the `convert` command in the terminal (Bash).
# This file can be directly run:
#   - first install `unix-permissions`
#   - then `bash node_modules/unix-permissions/examples/convert.sh`

# The following lines are only needed for this example.
# In a terminal, you should directly use `unix-permissions` instead.
shopt -s expand_aliases
alias unix-permissions='./build/src/bin/index.js'

unix-permissions convert.symbolic 111 # a=x

unix-permissions positive $(unix-permissions convert.symbolic 111) # a+x

unix-permissions convert.octal o+x # +0001

unix-permissions convert.octal o=x # 0001
