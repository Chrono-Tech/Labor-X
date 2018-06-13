const path = require('path')

module.exports = {
  resolve: {
    alias: {
      'src': path.join(__dirname, '../src'),
      'styles': path.join(__dirname, '../src/styles'),
      'normalize.css': path.join(__dirname, '../node_modules/normalize.css/normalize.css'),
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?modules', 'sass-loader'],
      },
      {
        test: /\.sass$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
      }
    ]
  }
}
