const urlLoader = 'url-loader'

module.exports = [
  {
    test: /\.(ttf|eot|woff(2)?|svg)(\?v=\d+\.\d+\.\d+)?$/,
    loaders: [urlLoader],
  },
  {
    test: /\.(jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
    loaders: [`${urlLoader}?limit=10240`],
  },
]
