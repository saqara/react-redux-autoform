import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

import pkg from './package.json'

export default [
  // CommonJS
  {
    input: 'src/index.js',
    output: { file: 'lib/react-redux-autoform.js', format: 'cjs', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      nodeResolve({ extensions: ['.js', '.json', '.jsx', '.mjs'] }),
      babel({ exclude: 'node_modules/**' }),
      commonjs({
        namedExports: {
          'node_modules/prop-types/index.js': [
            'arrayOf',
            'bool',
            'func',
            'node',
            'object',
            'oneOf',
            'oneOfType',
            'shape',
            'string'
          ]
        }
      })
    ]
  },

  // ES
  {
    input: 'src/index.js',
    output: { file: 'es/react-redux-autoform.js', format: 'es', indent: false },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      nodeResolve({ extensions: ['.js', '.json', '.jsx', '.mjs'] }),
      babel({ exclude: 'node_modules/**' }),
      commonjs({
        namedExports: {
          'node_modules/prop-types/index.js': [
            'arrayOf',
            'bool',
            'func',
            'node',
            'object',
            'oneOf',
            'oneOfType',
            'shape',
            'string'
          ]
        }
      })
    ]
  },

  // ES for Browsers
  {
    input: 'src/index.js',
    output: { file: 'es/react-redux-autoform.mjs', format: 'es', indent: false },
    plugins: [
      nodeResolve({ extensions: ['.js', '.json', '.jsx', '.mjs'] }),
      babel(),
      commonjs({
        namedExports: {
          'node_modules/prop-types/index.js': [
            'arrayOf',
            'bool',
            'func',
            'node',
            'object',
            'oneOf',
            'oneOfType',
            'shape',
            'string'
          ],
          'node_modules/react/index.js': [
            'Children',
            'Component',
            'createElement'
          ],
          'node_modules/react-redux/node_modules/react-is/index.js': ['isValidElementType']
        }
      }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  },

  // UMD Development
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-redux-autoform.js',
      format: 'umd',
      name: 'ReactReduxAutoform',
      indent: false
    },
    plugins: [
      nodeResolve({ extensions: ['.js', '.json', '.jsx', '.mjs'] }),
      babel(),
      commonjs({
        namedExports: {
          'node_modules/prop-types/index.js': [
            'arrayOf',
            'bool',
            'func',
            'node',
            'object',
            'oneOf',
            'oneOfType',
            'shape',
            'string'
          ],
          'node_modules/react/index.js': [
            'Children',
            'Component',
            'createElement'
          ],
          'node_modules/react-redux/node_modules/react-is/index.js': ['isValidElementType']
        }
      }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') })
    ]
  },

  // UMD Production
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-redux-autoform.min.js',
      format: 'umd',
      name: 'ReactReduxAutoform',
      indent: false
    },
    plugins: [
      nodeResolve({ extensions: ['.js', '.json', '.jsx', '.mjs'] }),
      babel(),
      commonjs({
        namedExports: {
          'node_modules/prop-types/index.js': [
            'arrayOf',
            'bool',
            'func',
            'node',
            'object',
            'oneOf',
            'oneOfType',
            'shape',
            'string'
          ],
          'node_modules/react/index.js': [
            'Children',
            'Component',
            'createElement'
          ],
          'node_modules/react-redux/node_modules/react-is/index.js': ['isValidElementType']
        }
      }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  }
]
