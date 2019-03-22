#!/usr/bin/env bash
# Demo of the `object` permission type in the terminal (Bash).
# This file can be directly run:
#   - first install `unix-permissions`
#   - then `bash node_modules/unix-permissions/examples/types/object.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/unix-permissions

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/../utils.sh"

unix-permissions convert.symbolic '{ "others": { "read": true, "execute": true } }'
# o+rx

unix-permissions convert.symbolic '{ "others": { "read": true, "execute": false } }'
# o+r,o-x

unix-permissions convert.symbolic '{ "others": { "read": true } }'
# o+r

unix-permissions convert.symbolic '{ "all": { "read": true } }'
# a+r

unix-permissions convert.symbolic {}
# a+

unix-permissions convert.symbolic '{ "special": { "setuid": true, "setgid": true, "sticky": true } }'
# ug+s,o+t
