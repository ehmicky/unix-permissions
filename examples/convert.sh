#!/bin/bash
# This example demonstrates the `convert` command in the terminal (Bash).
# This file can be directly run:
#   - first install `unix-permissions`
#   - then `bash node_modules/unix-permissions/examples/convert.sh`

build/src/bin/index.js convert.symbolic 111 # a=x

build/src/bin/index.js positive $(build/src/bin/index.js convert.symbolic 111) # a+x

build/src/bin/index.js convert.octal o+x # +0001

build/src/bin/index.js convert.octal o=x # 0001
