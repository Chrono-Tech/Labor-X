const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ["src/styles/globals"],
            }
          }
        ]
      }
    ]
  },
  stats: {
    warnings: false,
    modules: false,
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src'),
      'styles': path.resolve(__dirname, 'src/styles'),
      'store': path.resolve(__dirname, 'src/store'),
      'models': path.resolve(__dirname, 'src/models'),
      'i18n': path.resolve(__dirname, 'src/i18n'),
      'components': path.resolve(__dirname, 'src/components'),
      'config': path.resolve(__dirname, 'config'),
      'normalize.css': path.join(__dirname, 'node_modules/normalize.css/normalize.css'),
    }
  },
  devtool: 'eval-source-map'
};