#!/bin/bash

build/src/bin/index.js convert.symbolic 111 # a=x

build/src/bin/index.js positive $(build/src/bin/index.js convert.symbolic 111) # a+x

build/src/bin/index.js convert.octal o+x # +0001

build/src/bin/index.js convert.octal o=x # 0001
