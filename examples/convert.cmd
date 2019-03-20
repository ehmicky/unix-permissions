:: This example demonstrates the `convert` command in the Windows default
:: terminal (`cmd.exe`).
:: This file can be directly run:
::   - first install `unix-permissions`
::   - then `node_modules\unix-permissions\examples\convert.cmd`
:: The `call` keyword is only needed inside this file, not in a terminal.
:: The `npx` keyword is not needed if the library is installed globally.

@echo off

call npx unix-permissions convert.symbolic 111
:: a=x

call npx unix-permissions convert.octal o+x
:: +0001

call npx unix-permissions convert.octal o=x
:: 0001
