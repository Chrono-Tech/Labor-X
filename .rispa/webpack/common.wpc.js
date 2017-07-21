const path = require('path')
const commonLoaders = require('./common-loaders')

module.exports = () => ({
  entry: {
    vendor: [
      path.resolve(__dirname, '../../styles/base.sss'),
    ],
  },
  module: {
    rules: commonLoaders,
  },
})
