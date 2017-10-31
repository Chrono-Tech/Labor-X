const WebpackPluginApi = require('@rispa/webpack')
const RenderServerPluginApi = require('@rispa/render-server')
const UiKitPlugin = require('./UiKitPlugin')
const UiKitPluginApi = require('./UiKitPluginApi')

module.exports.default = UiKitPlugin

module.exports.api = UiKitPluginApi

module.exports.after = [WebpackPluginApi.pluginName, RenderServerPluginApi.pluginName]
