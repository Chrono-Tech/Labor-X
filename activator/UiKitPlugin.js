const path = require('path')
const fs = require('fs')
const { PluginInstance } = require('@rispa/core')
const WebpackPluginApi = require('@rispa/webpack')
const RenderServerPluginApi = require('@rispa/render-server')
const commonWebpackConfig = require('./webpack/common.wpc')
const ssrCache = require('../ssr-cache')

class UiKitPlugin extends PluginInstance {
  constructor(context) {
    super(context)

    this.webpack = context.get(WebpackPluginApi.pluginName)
    this.renderServer = context.get(RenderServerPluginApi.pluginName)

    this.storiesContexts = [
      path.resolve(__dirname, '../atoms'),
      path.resolve(__dirname, '../molecules'),
    ]
  }

  start() {
    this.webpack.addCommonConfig(commonWebpackConfig)

    this.renderServer.setCache(ssrCache)
  }

  addStories(stories) {
    this.storiesContexts = this.storiesContexts.concat(stories)
  }

  createStoriesContexts() {
    const stories = this.storiesContexts
      .map(context => context.replace(/\\/g, '/'))
      .map(context => `require.context('${context}', true, /.stories.js$/)`)

    const configFolder = path.resolve(__dirname, '../.storybook/')
    const configTemplatePath = `${configFolder}/config.template.js`
    const configPath = `${configFolder}/config.js`
    const configContent = String(fs.readFileSync(configTemplatePath))

    fs.writeFileSync(
      configPath,
      configContent.replace('// {storiesContexts}', stories.join(',\n')),
    )
  }
}

module.exports = UiKitPlugin
