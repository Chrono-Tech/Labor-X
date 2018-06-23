const withSass = require('@zeit/next-sass')
const path = require('path')
const glob = require('glob')

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:5]',
  },

  sassLoaderOptions: {
    includePaths: ["src/styles/globals"],
  },

  distDir: 'build',



  webpack: (config, { dev }) => {

    if (dev) {
      config.devtool = 'cheap-module-source-map';
    }

    config.resolve.alias = {
      'src': path.join(__dirname, 'src'),
      'styles': path.join(__dirname, 'src/styles'),
      'normalize.css': path.join(__dirname, 'node_modules/normalize.css/normalize.css'),
    }

    config.resolve.extensions = [ '.js', '.jsx', '.scss', '.css' ]

    return config
  },
})
