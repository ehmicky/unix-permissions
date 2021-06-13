#!/usr/bin/env bash
# Ignore this file, this is only needed for internal purposes.

shopt -s expand_aliases
alias "unix-permissions"='node "$(dirname "$BASH_SOURCE")/../../build/src/bin/main.js"'
