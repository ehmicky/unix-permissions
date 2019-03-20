#!/usr/bin/env bash
# Ignore this file, this is only needed for internal purposes.
# We create an alias so that examples look the same as if the library was
# directly installed.
shopt -s expand_aliases
alias unix-permissions="$(dirname "$BASH_SOURCE")/../build/src/bin/index.js"
