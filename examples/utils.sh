#!/usr/bin/env bash
# Ignore this file, this is only needed for internal purposes.
# We create an alias so that examples look the same as if the library was
# directly installed.

projectRoot="$(readlink -f "$(dirname "$BASH_SOURCE")/..")"
binaryName="$(basename "$projectRoot")"
pathToBinary="build/src/bin/index.js"

shopt -s expand_aliases
alias "$binaryName"="$projectRoot/$pathToBinary"
