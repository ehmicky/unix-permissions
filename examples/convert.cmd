:: This example demonstrates the `convert` command in the Windows default
:: terminal (`cmd.exe`).
:: This file can be directly run:
::   - first install `unix-permissions`
::   - then `cmd /q /d /s /c node_modules\unix-permissions\examples\convert.cmd`

call npx unix-permissions convert.symbolic 111
:: a=x

call npx unix-permissions convert.octal o+x
:: +0001

call npx unix-permissions convert.octal o=x
:: 0001
