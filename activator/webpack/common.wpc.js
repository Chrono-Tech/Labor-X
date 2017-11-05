const path = require('path')
const commonLoaders = require('./common-loaders')

const cssLoader = 'css-loader'
const styleLoader = 'style-loader'
const postcssLoader = require.resolve('postcss-loader')
const classNamesLoader = path.resolve(__dirname, './classnames-loader.js')
const postcssConfigPath = path.resolve(__dirname, '../../postcss.config.js')

module.exports = () => ({
  entry: {
    vendor: [
      path.resolve(__dirname, '../../styles/base.sss'),
    ],
  },
  module: {
    rules: [
      ...commonLoaders,
      {
        test: /\.sss$/,
        loaders: [
          classNamesLoader,
          styleLoader,
          `${cssLoader}?modules=true&importLoaders=1&localIdentName=[name]_[local]`,
          {
            loader: postcssLoader,
            options: {
              config: {
                path: postcssConfigPath,
              },
            },
          },
        ],
      },
    ],
  },
})
