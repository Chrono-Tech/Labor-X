import { init, start, build, generator } from '@rispa/core/events'
// TODO: use import after @rispa/server publishing
// import { server } from '@rispa/server/events'
const server = () => 'server'
import { storybook } from '../events'
import path from 'path'
import fs from 'fs'
import webpackCommon from './webpack/common.wpc'
import uiKitGenerator from './generators'
import ssrCache from './ssr-cache'

const activator = on => {
  const buildStaticHandler = registry => {
    registry.add('webpack.common', webpackCommon)
    registry.add('webpack.client', webpackCommon)
    registry.add('ssr-cache', ssrCache)
  }
  on(init(build), buildStaticHandler)
  on(init(server), buildStaticHandler)

  on(init(storybook), registry => {
    registry.add('storiesContexts', path.resolve(__dirname, '../atoms'))
    registry.add('storiesContexts', path.resolve(__dirname, '../molecules'))
  })

  on(start(generator), (registry, plop) => {
    uiKitGenerator(plop)
  })

  on(start(storybook), registry => {
    const stories = registry.get('storiesContexts')
      .map(context => context.replace(/\\/g, '/'))
      .map(context => `require.context('${context}', true, /.stories.js$/)`)

    const configFolder = path.resolve(__dirname, '../.storybook/')
    const configTemplatePath = `${configFolder}/config.template.js`
    const configPath = `${configFolder}/config.js`
    const configContent = String(fs.readFileSync(configTemplatePath))

    fs.writeFileSync(
      configPath,
      configContent.replace('// {storiesContexts}', stories.join(',\n'))
    )
  })
}

export default activator
