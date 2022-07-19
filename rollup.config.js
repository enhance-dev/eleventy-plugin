import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'node_modules/@enhance/ssr/index.mjs',
  output: {
    file: `vendor/enhance-ssr.js`,
    format: 'cjs'
  },
  plugins: [
    nodeResolve(),
    commonjs({ignore: ['fs', 'path']}), 
    json()
  ]
}
