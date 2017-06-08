const commonLoaders = require('./common-loaders')

module.exports = () => ({
  module: {
    rules: commonLoaders,
  },
})
