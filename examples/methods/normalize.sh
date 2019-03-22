#!/usr/bin/env bash
# Demo of the `normalize` method in the terminal (Bash).
# This file can be directly run:
#   - first install `unix-permissions`
#   - then `bash node_modules/unix-permissions/examples/methods/normalize.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/unix-permissions

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/../utils.sh"

unix-permissions normalize 1 # 0001

unix-permissions normalize g+x,o+x # go+x

unix-permissions normalize 'd--- --- ---' # ---------

unix-permissions normalize '{ "user": { "write": true } }' # {"user":{"write":true}}

unix-permissions normalize z+x # Permissions syntax is invalid: z+x
echo $? # 1 (status code)
