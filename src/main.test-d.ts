import {
  PermissionOctal,
  PermissionNumber,
  PermissionStat,
  PermissionSymbolic,
  PermissionObject,
  Permission,
  PermissionType,
  convert,
  type,
  normalize,
  positive,
  contain,
  equal,
  set,
  not,
  invert,
  min,
} from 'unix-permissions'
import {
  expectType,
  expectError,
  expectAssignable,
  expectNotAssignable,
} from 'tsd'

expectAssignable<PermissionOctal>('1')
expectAssignable<PermissionOctal>('11')
expectAssignable<PermissionOctal>('111')
expectAssignable<PermissionOctal>('1111')
expectNotAssignable<PermissionOctal>('11111')
expectNotAssignable<PermissionOctal>('8')
expectNotAssignable<PermissionOctal>('18')
expectNotAssignable<PermissionOctal>('118')
expectNotAssignable<PermissionOctal>('1118')
expectNotAssignable<PermissionOctal>('a')
expectAssignable<PermissionOctal>('0o1111')
expectAssignable<PermissionOctal>('01111')
expectAssignable<PermissionOctal>('\\1111')
expectNotAssignable<PermissionOctal>('oo1111')
expectAssignable<PermissionOctal>('+1111')
expectAssignable<PermissionOctal>('=1111')
expectAssignable<PermissionOctal>('-1111')
expectNotAssignable<PermissionOctal>('/1111')
expectAssignable<PermissionOctal>('-0o1111')
expectNotAssignable<PermissionOctal>('')

expectAssignable<PermissionNumber>(0)
expectAssignable<PermissionNumber>(255)
expectNotAssignable<PermissionNumber>('255')

expectAssignable<PermissionStat>('----------')
expectAssignable<PermissionStat>('drwxXsSxtT')
expectNotAssignable<PermissionStat>('drwxXsSxto')
expectNotAssignable<PermissionStat>('other')
expectNotAssignable<PermissionStat>('')

expectAssignable<PermissionSymbolic>('o+wx')
expectAssignable<PermissionSymbolic>('o=wx')
expectAssignable<PermissionSymbolic>('o-wx')
expectAssignable<PermissionSymbolic>('go+x')
expectAssignable<PermissionSymbolic>('g+x,o+x')
expectAssignable<PermissionSymbolic>('a+x')
expectAssignable<PermissionSymbolic>('u+x')
expectAssignable<PermissionSymbolic>('+x')
expectAssignable<PermissionSymbolic>('a+w')
expectAssignable<PermissionSymbolic>('a+r')
expectAssignable<PermissionSymbolic>('a+X')
expectAssignable<PermissionSymbolic>('a+s')
expectAssignable<PermissionSymbolic>('a+t')
expectAssignable<PermissionSymbolic>('a+')
expectNotAssignable<PermissionSymbolic>('')
expectNotAssignable<PermissionSymbolic>('o/wx')
expectNotAssignable<PermissionSymbolic>('r+x')
expectNotAssignable<PermissionSymbolic>('a+p')

expectAssignable<PermissionObject>({})
expectAssignable<PermissionObject>({ user: {} })
expectAssignable<PermissionObject>({ group: {} })
expectAssignable<PermissionObject>({ others: {} })
expectAssignable<PermissionObject>({ all: {} })
expectAssignable<PermissionObject>({ special: {} })
expectAssignable<PermissionObject>({
  user: {},
  group: {},
  others: {},
  all: {},
  special: {},
})
expectAssignable<PermissionObject>({ user: { read: true } })
expectAssignable<PermissionObject>({ user: { read: false } })
expectAssignable<PermissionObject>({ user: { read: undefined } })
expectAssignable<PermissionObject>({ user: { write: true } })
expectAssignable<PermissionObject>({ user: { execute: true } })
expectAssignable<PermissionObject>({
  user: { read: true, write: true, execute: true },
})
expectAssignable<PermissionObject>({
  group: { read: true, write: true, execute: true },
})
expectAssignable<PermissionObject>({
  others: { read: true, write: true, execute: true },
})
expectAssignable<PermissionObject>({
  all: { read: true, write: true, execute: true },
})
expectAssignable<PermissionObject>({ special: { setuid: true } })
expectAssignable<PermissionObject>({ special: { setuid: false } })
expectAssignable<PermissionObject>({ special: { setuid: undefined } })
expectAssignable<PermissionObject>({ special: { setgid: true } })
expectAssignable<PermissionObject>({ special: { sticky: true } })
expectAssignable<PermissionObject>({
  special: { setuid: true, setgid: true, sticky: true },
})
expectNotAssignable<PermissionObject>('')
expectNotAssignable<PermissionObject>({ user: '' })
expectNotAssignable<PermissionObject>({ group: '' })
expectNotAssignable<PermissionObject>({ others: '' })
expectNotAssignable<PermissionObject>({ all: '' })
expectNotAssignable<PermissionObject>({ special: '' })
expectNotAssignable<PermissionObject>({ unknown: {} })
expectNotAssignable<PermissionObject>({ user: { read: 'true' } })
expectNotAssignable<PermissionObject>({ user: { setuid: true } })
expectNotAssignable<PermissionObject>({ user: { unknown: true } })
expectNotAssignable<PermissionObject>({ group: { read: 'true' } })
expectNotAssignable<PermissionObject>({ group: { setuid: true } })
expectNotAssignable<PermissionObject>({ group: { unknown: true } })
expectNotAssignable<PermissionObject>({ others: { read: 'true' } })
expectNotAssignable<PermissionObject>({ others: { setuid: true } })
expectNotAssignable<PermissionObject>({ others: { unknown: true } })
expectNotAssignable<PermissionObject>({ all: { read: 'true' } })
expectNotAssignable<PermissionObject>({ all: { setuid: true } })
expectNotAssignable<PermissionObject>({ all: { unknown: true } })
expectNotAssignable<PermissionObject>({ special: { setuid: 'true' } })
expectNotAssignable<PermissionObject>({ special: { read: true } })
expectNotAssignable<PermissionObject>({ special: { unknown: true } })

expectAssignable<Permission>('111')
expectAssignable<Permission>(0o111)
expectAssignable<Permission>('d--x--x--x')
expectAssignable<Permission>('a+x')
expectAssignable<Permission>({ all: { execute: true } })
expectNotAssignable<Permission>('')

expectAssignable<PermissionType>('octal')
expectAssignable<PermissionType>('number')
expectAssignable<PermissionType>('stat')
expectAssignable<PermissionType>('symbolic')
expectAssignable<PermissionType>('object')
expectNotAssignable<PermissionType>('unknown')
expectNotAssignable<PermissionType>('')

expectType<PermissionOctal>(convert.octal('111'))
expectType<PermissionOctal>(convert.octal(0o111))
expectType<PermissionOctal>(convert.octal('d--x--x--x'))
expectType<PermissionOctal>(convert.octal('a+x'))
expectType<PermissionOctal>(convert.octal({ all: { execute: true } }))
expectError(convert.octal(''))

expectType<PermissionNumber>(convert.number('111'))
expectType<PermissionNumber>(convert.number(0o111))
expectType<PermissionNumber>(convert.number('d--x--x--x'))
expectType<PermissionNumber>(convert.number('a+x'))
expectType<PermissionNumber>(convert.number({ all: { execute: true } }))
expectError(convert.number(''))

expectType<PermissionStat>(convert.stat('111'))
expectType<PermissionStat>(convert.stat(0o111))
expectType<PermissionStat>(convert.stat('d--x--x--x'))
expectType<PermissionStat>(convert.stat('a+x'))
expectType<PermissionStat>(convert.stat({ all: { execute: true } }))
expectError(convert.stat(''))

expectType<PermissionSymbolic>(convert.symbolic('111'))
expectType<PermissionSymbolic>(convert.symbolic(0o111))
expectType<PermissionSymbolic>(convert.symbolic('d--x--x--x'))
expectType<PermissionSymbolic>(convert.symbolic('a+x'))
expectType<PermissionSymbolic>(convert.symbolic({ all: { execute: true } }))
expectError(convert.symbolic(''))

expectType<PermissionObject>(convert.object('111'))
expectType<PermissionObject>(convert.object(0o111))
expectType<PermissionObject>(convert.object('d--x--x--x'))
expectType<PermissionObject>(convert.object('a+x'))
expectType<PermissionObject>(convert.object({ all: { execute: true } }))
expectError(convert.object(''))

expectType<PermissionType>(type('111'))
expectType<PermissionType>(type(0o111))
expectType<PermissionType>(type('d--x--x--x'))
expectType<PermissionType>(type('a+x'))
expectType<PermissionType>(type({ all: { execute: true } }))
expectType<'invalid'>(type(''))

expectType<PermissionOctal>(normalize('111'))
expectType<PermissionNumber>(normalize(0o111))
expectType<PermissionStat>(normalize('d--x--x--x'))
expectType<PermissionSymbolic>(normalize('a+x'))
expectType<PermissionObject>(normalize({ all: { execute: true } }))
expectType<never>(normalize(''))

expectType<PermissionOctal>(positive('111'))
expectType<PermissionNumber>(positive(0o111))
expectType<PermissionStat>(positive('d--x--x--x'))
expectType<PermissionSymbolic>(positive('a+x'))
expectType<PermissionObject>(positive({ all: { execute: true } }))
expectType<never>(positive(''))

expectType<boolean>(contain('111', '111'))
expectType<boolean>(contain(0o111, 0o111))
expectType<boolean>(contain('d--x--x--x', 'd--x--x--x'))
expectType<boolean>(contain('a+x', 'a+x'))
expectType<boolean>(
  contain({ all: { execute: true } }, { all: { execute: true } }),
)
expectType<boolean>(contain('111', '111', '111'))
expectError(contain('111'))
expectError(contain('111', ''))
expectError(contain('', '111'))
expectError(contain('111', '111', ''))

expectType<boolean>(equal('111', '111'))
expectType<boolean>(equal(0o111, 0o111))
expectType<boolean>(equal('d--x--x--x', 'd--x--x--x'))
expectType<boolean>(equal('a+x', 'a+x'))
expectType<boolean>(
  equal({ all: { execute: true } }, { all: { execute: true } }),
)
expectType<boolean>(equal('111', '111', '111'))
expectError(equal('111'))
expectError(equal('111', ''))
expectError(equal('', '111'))
expectError(equal('111', '111', ''))

expectType<PermissionOctal>(set('111', '111'))
expectType<PermissionNumber>(set(0o111, 0o111))
expectType<PermissionStat>(set('d--x--x--x', 'd--x--x--x'))
expectType<PermissionSymbolic>(set('a+x', 'a+x'))
expectType<PermissionObject>(
  set({ all: { execute: true } }, { all: { execute: true } }),
)
expectType<PermissionOctal>(set('111', '111', '111'))
expectType<PermissionOctal>(set('111', 0o111))
expectType<never>(set('', '111'))

expectType<PermissionOctal>(not('111'))
expectType<PermissionNumber>(not(0o111))
expectType<PermissionStat>(not('d--x--x--x'))
expectType<PermissionSymbolic>(not('a+x'))
expectType<PermissionObject>(not({ all: { execute: true } }))
expectType<never>(not(''))

expectType<PermissionOctal>(invert('111'))
expectType<PermissionNumber>(invert(0o111))
expectType<PermissionStat>(invert('d--x--x--x'))
expectType<PermissionSymbolic>(invert('a+x'))
expectType<PermissionObject>(invert({ all: { execute: true } }))
expectType<never>(invert(''))

expectType<PermissionOctal>(min('111', '111'))
expectType<PermissionNumber>(min(0o111, 0o111))
expectType<PermissionStat>(min('d--x--x--x', 'd--x--x--x'))
expectType<PermissionSymbolic>(min('a+x', 'a+x'))
expectType<PermissionObject>(
  min({ all: { execute: true } }, { all: { execute: true } }),
)
expectType<undefined>(min())
expectType<PermissionOctal>(min('111', '111', '111'))
expectType<PermissionOctal>(min('111', 0o111))
expectType<never>(min('', '111'))
