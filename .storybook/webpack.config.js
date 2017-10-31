const babelrcConfig = require('@rispa/babel/lib/babelConfig').default

const commonLoaders = require('../activator/webpack/common-loaders')

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
