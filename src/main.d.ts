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
