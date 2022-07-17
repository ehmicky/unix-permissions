/**
 * Permission type used by [`chmod`](https://linux.die.net/man/1/chmod).
 *
 * Octal string where each digit represents a user class: `user`, `group` and
 * `others`.
 * Each digit's is a [bitfield](https://en.wikipedia.org/wiki/Bit_field)
 * representing `read`, `write` and `execute`. Special permissions
 * ([setuid](https://en.wikipedia.org/wiki/Setuid),
 * [setgid](https://en.wikipedia.org/wiki/Setuid),
 * [sticky](https://en.wikipedia.org/wiki/Sticky_bit)) can optionally be specified
 * by prepending another digit.
 *
 * An operator can be prepended:
 *  - `=` (default): unset omitted permissions
 *  - `+`: leave omitted permissions as is
 *  - `-`: unset specified permissions
 *
 * @example
 * ```js
 * console.log(convert.stat('720')) // 'rwx-w----'
 * console.log(convert.stat('7000')) // '--S--S--T'
 * console.log(convert.stat('\\720')) // 'rwx-w----'
 * console.log(convert.stat('0720')) // 'rwx-w----'
 * console.log(convert.stat('0o720')) // 'rwx-w----'
 * console.log(convert.symbolic('+720')) // 'u+rwx,g+w'
 * console.log(convert.symbolic('-720')) // 'u-rwx,g-w'
 * console.log(convert.symbolic('=720')) // 'u=rwx,g=w,o='
 * ```
 */
export type PermissionOctal =
  | `${OctalStart}${OctalDigit}`
  | `${OctalStart}${OctalDigit}${OctalDigit}`
  | `${OctalStart}${OctalDigit}${OctalDigit}${OctalDigit}`
  | `${OctalStart}${OctalDigit}${OctalDigit}${OctalDigit}${OctalDigit}`
type OctalDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7'
type OctalPrefix = '' | '0o' | '0' | '\\'
type OctalOperator = '' | '=' | '+' | '-'
type OctalStart = `${OctalOperator}${OctalPrefix}`

/**
 * Permission type used by Node.js
 * [`fs.chmod()`](https://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback).
 *
 * It is the same as `octal` except:
 *  - as a decimal number.
 *  - no operator can be used.
 *  - it can be used as input in [JavaScript](../README.md#usage-javascript) but
 *    not on the [command line](../README.md#usage-cli), where all numbers
 *    should be in [`octal`](#octal) form instead.
 *
 * @example
 * ```js
 * console.log(convert.stat(0)) // '---------'
 * console.log(convert.stat(1)) // '--------x'
 * console.log(convert.stat(3)) // '-------wx'
 * console.log(convert.stat(8)) // '-----x---'
 * console.log(convert.stat(512)) // '--------T'
 * ```
 */
export type PermissionNumber = number

/**
 *
 * @example
 * ```js
 * ```
 */
export declare const convert: {
  number: () => void
  octal: () => void
  stat: () => void
  symbolic: () => void
  object: () => void
}
