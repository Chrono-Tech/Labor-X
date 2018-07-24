const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'pages'),
        ],
      },
      {
        test: /\.scss$/,
        use: [
          // { // https://webpack.js.org/guides/build-performance/#sass
          //   loader: "thread-loader",
          //   options: {
          //     workerParallelJobs: 2,
          //   }
          // },
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            }
          },
          "postcss-loader",
          {
            loader: 'fast-sass-loader',
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
  plugins: [
    new CleanWebpackPlugin(['out']),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};