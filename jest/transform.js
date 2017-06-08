const babelJest = require('babel-jest')
const getBabelConfig = require('@rispa/core/babel')

module.exports = babelJest.createTransformer(getBabelConfig())
