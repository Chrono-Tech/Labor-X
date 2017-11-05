const babelJest = require('babel-jest')
const getBabelConfig = require('@rispa/babel/config')

module.exports = babelJest.createTransformer(getBabelConfig())
