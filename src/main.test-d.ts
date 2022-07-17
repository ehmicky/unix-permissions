import {
  convert,
  PermissionOctal,
  PermissionNumber,
  PermissionStat,
  PermissionSymbolic,
  PermissionObject,
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
