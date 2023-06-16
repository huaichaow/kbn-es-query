const { join } = require('path');
const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const ts = require('@rollup/plugin-typescript');

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'build/index.js',
      format: 'cjs',
    },
    plugins: [
      ts({ module: 'esnext' }),
      commonjs(),
      json(),
      nodeResolve({
        preferBuiltins: true,
        modulePaths: [
          join(__dirname, "deps"),
        ],
        resolveOnly(module) {
          return module.startsWith('@kbn');
        },
      }),
    ],
  },
  {
    input: 'src/example.ts',
    output: {
      file: 'build/example.js',
      format: 'cjs',
    },
    plugins: [
      ts({
        module: 'esnext',
        compilerOptions: {
          // clear paths to prevent expanding import of 'kbn-es-query' to '@kbn/es-query'
          paths: [],
        },
      }),
      nodeResolve({
        preferBuiltins: true,
        resolveOnly(module) {
          return false;
        },
      }),
    ],
  },
];
