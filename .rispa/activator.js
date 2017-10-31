import path from 'path'
import fs from 'fs'
import { init, start, build, generator } from '@rispa/core/events'
import { server } from '@rispa/server/events'
import { storybook } from '../events'
import webpackCommon from '../activator/webpack/common.wpc'
import ssrCache from '../ssr-cache'

const activator = on => {
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
