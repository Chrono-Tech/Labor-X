const path = require('path')

const config = {
  publicPath: '/',
  outputPath: path.resolve(__dirname, '../../build'),
  server: {
    host: 'localhost',
    port: process.env.PORT || 3000,
  },
}

module.exports = config
