import avaConfig from '@ehmicky/dev-tasks/ava.config.js'

export default {
  ...avaConfig,
  // CI tests on Windows fail due to the amount of parallel tests otherwise
  concurrency: 1,
}
