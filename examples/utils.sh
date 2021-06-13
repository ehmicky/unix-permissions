#!/usr/bin/env bash
# Ignore this file, this is only needed for internal purposes.

shopt -s expand_aliases
examplesDir="$(dirname "$BASH_SOURCE")"
alias "unix-permissions"='node "$examplesDir/../build/src/bin/main.js"'
