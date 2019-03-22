#!/usr/bin/env bash
# Demo of the `not` command in the terminal (Bash).
# This file can be directly run:
#   - first install `unix-permissions`
#   - then `bash node_modules/unix-permissions/examples/methods/not.sh`
# An online demo is also available at:
#   https://repl.it/@ehmicky/unix-permissions

# Ignore the following line: this is only needed for internal purposes.
. "$(dirname "$BASH_SOURCE")/../utils.sh"

unix-permissions not u+xs # u-xs

unix-permissions not u-xs # u+xs

unix-permissions not u=x # u=rws

unix-permissions not a=x # ug=rws,o=rwt

unix-permissions not rws-ws-w- # ---r--r-t

unix-permissions not 0660 # 7117

unix-permissions not 1660 # 6117

unix-permissions set rwxrwxrwx $(unix-permissions not a+x) # rw-rw-rw-

unix-permissions set --------- $(unix-permissions not a-x) # --x--x--x

unix-permissions set a+xr $(unix-permissions not a+r) # a+x,a-r
