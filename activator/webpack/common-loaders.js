const path = require('path')

const resolveLoader = loader => path.resolve(__dirname, '../../node_modules', loader)

const urlLoader = 'url-loader'
const cssLoader = 'css-loader'
const styleLoader = 'style-loader'
const postcssLoader = resolveLoader('postcss-loader')
const classNamesLoader = path.resolve(__dirname, './classnames-loader.js')

module.exports = [
  {
    test: /\.sss$/,
    loaders: [
      classNamesLoader,
      styleLoader,
      `${cssLoader}?modules=true&importLoaders=1&localIdentName=[name]_[local]`,
      `${postcssLoader}?config=${path.resolve(__dirname, '../../postcss.config.js')}`,
    ],
  },
  {
    test: /\.(ttf|eot|woff(2)?|svg)(\?v=\d+\.\d+\.\d+)?$/,
    loaders: [urlLoader],
  },
  {
    test: /\.(jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
    loaders: [`${urlLoader}?limit=10240`],
  },
]
