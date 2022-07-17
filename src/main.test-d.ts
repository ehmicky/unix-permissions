import {
  convert,
  PermissionOctal,
  PermissionNumber,
  PermissionStat,
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

expectAssignable<PermissionNumber>(0)
expectAssignable<PermissionNumber>(255)
expectNotAssignable<PermissionNumber>('255')

expectAssignable<PermissionStat>('----------')
expectAssignable<PermissionStat>('drwxXsSxtT')
expectNotAssignable<PermissionStat>('drwxXsSxto')
expectNotAssignable<PermissionStat>('other')
