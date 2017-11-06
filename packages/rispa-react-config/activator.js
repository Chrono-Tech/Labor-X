const { createConfigActivator, default: api } = require('@rispa/config')
const config = require('./config')

module.exports.default = createConfigActivator(config)

module.exports.api = api
