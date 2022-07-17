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
 * Permission type used by [`stat`](https://linux.die.net/man/2/stat) and
 * [`ls`](https://linux.die.net/man/1/ls).
 *
 * It is a string where each character represents either the permission
 * (`r`, `w`, `x`) or no permission (`-`). The special permission are indicated
 * with `S`, `s`, `T` and `t` where lowercase implies `x` is also present.
 *
 * Optionally a first character can be specified to indicate the file type
 * (e.g. `d` for directories).
 *
 * @example
 * ```js
 * console.log(convert.octal('--------x')) // '0001'
 * console.log(convert.octal('--x--x--x')) // '0111'
 * console.log(convert.octal('--------T')) // '1000'
 * console.log(convert.octal('--------t')) // '1001'
 * console.log(convert.octal('d--------x')) // '0001'
 * console.log(convert.octal('--x --x --x')) // '0111'
 * console.log(convert.octal('rwx --- ---')) // '0700'
 * console.log(convert.octal('xwr --- ---')) // '0700'
 * ```
 */
export type PermissionStat =
  `${string}${PermissionStatOthersBit}${PermissionStatOthersBit}${PermissionStatOthersBit}`
type PermissionStatOthersBit = '-' | 'r' | 'w' | 'x' | 'X' | 't' | 'T'

/**
 * Permission type used by [`chmod`](https://linux.die.net/man/1/chmod) as a
 * string like `gu+rx`.
 *
 * Starts with the user class (`a` for all, `u` for user, `g` for group, `o` for
 * others) then the operator (`+`, `-` or `=`) and ends with the permissions
 * characters.
 *
 * While `+` leaves the omitted permissions as is, `=` unsets them. For example
 * `o=x` is the same as combining `o+x` and `o-rwt`.
 *
 * Several groups can be specified using a comma-separated list like `g+x,o+r`.
 *
 * User classes can be concatenated like `go+x`.
 *
 * @example
 * ```js
 * console.log(convert.octal('o+wx')) // '+0003'
 * console.log(convert.octal('o=wx')) // '0003'
 * console.log(convert.octal('o-wx')) // '-0003'
 * console.log(convert.octal('go+x')) // '+0011'
 * console.log(convert.octal('g+x,o+x')) // '+0011'
 * console.log(convert.octal('a+x')) // '+0111'
 * console.log(convert.octal('+x')) // '+0111'
 * console.log(convert.octal('a+s')) // '+6000'
 * console.log(convert.octal('o+')) // '+0000'
 * ```
 */
export type PermissionSymbolic =
  | `${PermissionSymbolicSingle}`
  | `${string},${PermissionSymbolicSingle}`
type PermissionSymbolicSingle =
  `${PermissionSymbolicClasses}${PermissionSymbolicOperator}${PermissionSymbolicActions}`
type PermissionSymbolicClass = 'a' | 'u' | 'g' | 'o'
type PermissionSymbolicClasses = '' | `${string}${PermissionSymbolicClass}`
type PermissionSymbolicOperator = '+' | '=' | '-'
type PermissionSymbolicAction = 'x' | 'w' | 'r' | 'X' | 's' | 't'
type PermissionSymbolicActions = '' | `${string}${PermissionSymbolicAction}`

/**
 * Permission type as an object.
 * `undefined` leaves permissions as is while `false` unsets them.
 *
 * @example
 * ```js
 * console.log(convert.symbolic({ others: { read: true, execute: true } }))
 * // 'o+rx'
 *
 * console.log(convert.symbolic({ others: { read: true, execute: false } }))
 * // 'o+r,o-x'
 *
 * console.log(convert.symbolic({ others: { read: true, execute: undefined } }))
 * // 'o+r'
 *
 * console.log(convert.symbolic({ all: { read: true } }))
 * // 'a+r'
 *
 * console.log(convert.symbolic({}))
 * // 'a+'
 *
 * console.log(
 *   convert.symbolic({ special: { setuid: true, setgid: true, sticky: true } }),
 * )
 * // 'ug+s,o+t'
 * ```
 */
export type PermissionObject = Partial<{
  user: PermissionObjectClass
  group: PermissionObjectClass
  others: PermissionObjectClass
  all: PermissionObjectClass
  special: PermissionObjectSpecial
}>
type PermissionObjectClass = Partial<{
  read: PermissionObjectValue
  write: PermissionObjectValue
  execute: PermissionObjectValue
}>
type PermissionObjectSpecial = Partial<{
  setuid: PermissionObjectValue
  setgid: PermissionObjectValue
  sticky: PermissionObjectValue
}>
type PermissionObjectValue = boolean | undefined

/**
 * Permissions of a file for:
 *  - Each user class (user, group, others)
 *  - Each file operation (read, write, execute), including special operations
 *    (setuid, setgid, sticky)
 */
export type Permission =
  | PermissionOctal
  | PermissionNumber
  | PermissionStat
  | PermissionSymbolic
  | PermissionObject

/**
 * Type of permission format.
 */
export type PermissionType = 'octal' | 'number' | 'stat' | 'symbolic' | 'object'

export declare const convert: {
  /**
   * Returns `permission` converted to the octal type.
   *
   * @example
   * ```js
   * convert.octal('a+x') // '+0111'
   *
   * try {
   *   convert.octal('z+x') // Throws an exception (permission syntax is invalid)
   * } catch (error) {
   *   console.log(error.message)
   * }
   * ```
   */
  octal: (permission: Permission) => PermissionOctal

  /**
   * Returns `permission` converted to the number type.
   *
   * @example
   * ```js
   * convert.number('a+x') // 0o111
   *
   * try {
   *   convert.number('z+x') // Throws an exception (permission syntax is invalid)
   * } catch (error) {
   *   console.log(error.message)
   * }
   * ```
   */
  number: (permission: Permission) => PermissionNumber

  /**
   * Returns `permission` converted to the stat type.
   *
   * @example
   * ```js
   * convert.stat('a+x') // '--x--x--x'
   *
   * try {
   *   convert.stat('z+x') // Throws an exception (permission syntax is invalid)
   * } catch (error) {
   *   console.log(error.message)
   * }
   * ```
   */
  stat: (permission: Permission) => PermissionStat

  /**
   * Returns `permission` converted to the symbolic type.
   *
   * @example
   * ```js
   * convert.symbolic('--x--x--x') // 'a=x'
   *
   * try {
   *   convert.symbolic('--o--o--o') // Throws an exception (permission syntax is invalid)
   * } catch (error) {
   *   console.log(error.message)
   * }
   * ```
   */
  symbolic: (permission: Permission) => PermissionSymbolic

  /**
   * Returns `permission` converted to the object type.
   *
   * @example
   * ```js
   * convert.object('a+x')
   * // {
   * //   user: { execute: true },
   * //   group: { execute: true },
   * //   others: { execute: true }
   * // }
   *
   * try {
   *   convert.object('z+x') // Throws an exception (permission syntax is invalid)
   * } catch (error) {
   *   console.log(error.message)
   * }
   * ```
   */
  object: (permission: Permission) => PermissionObject
}
