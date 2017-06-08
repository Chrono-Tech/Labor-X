const getBabelrcConfig = require('@rispa/core/babel.js')

const babelrcConfig = getBabelrcConfig()
require('babel-register')(babelrcConfig)

const commonLoaders = require('../.rispa/webpack/common-loaders')

const babelLoader = require.resolve('babel-loader')

module.exports = baseConfig => Object.assign(
  {},
  baseConfig,
  {
    resolve: {
      modulesDirectories: [
        'node_modules',
      ],
      extensions: ['.json', '.js', ''],
    },
    module: {
      loaders: commonLoaders.concat([
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [
            `${babelLoader}?${JSON.stringify(babelrcConfig)}`,
          ],
        },
      ]),
    },
  }
)
