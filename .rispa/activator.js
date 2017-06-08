import path from 'path'
import fs from 'fs'
import webpackCommon from './webpack/common.wpc'
import gererator from './generators'
import ssrCache from './ssr-cache'

const activator = on => {
  on('init', (command, registry) => {
    if (command === 'build' || command === 'server') {
      registry.add('webpack.common', webpackCommon)
      registry.add('webpack.client', webpackCommon)
      registry.add('ssr-cache', ssrCache)
    }

    if (command === 'storybook') {
      registry.add('storiesContexts', path.resolve(__dirname, '../atoms'))
      registry.add('storiesContexts', path.resolve(__dirname, '../molecules'))
    }
  })

  on('start', (command, registry, plop) => {
    if (command === 'generator') {
      gererator(plop)
    }

    if (command === 'storybook') {
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
    }
  })
}

export default activator
