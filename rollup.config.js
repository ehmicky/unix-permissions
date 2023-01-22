import { nodeResolve } from '@rollup/plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'

// eslint-disable-next-line import/no-default-export
export default {
  input: 'src/main.js',
  output: {
    file: 'cjs/main.cjs',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [nodeResolve(), cleanup()],
}
