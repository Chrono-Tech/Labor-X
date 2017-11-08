import { configure, addDecorator, setAddon } from '@kadira/storybook'
import backgrounds from 'react-storybook-addon-backgrounds'
import infoAddon, { setDefaults } from '@kadira/react-storybook-addon-info'
import { withKnobs } from '@kadira/storybook-addon-knobs'

const isTest = process.env.NODE_ENV === 'test'

const addAll = () => {
  addDecorator(backgrounds([
    { name: 'White', value: '#fff', default: true },
    { name: 'Black Magic', value: '#333' },
  ]))

  setDefaults({ header: false, inline: true })
  setAddon(infoAddon)

  addDecorator(withKnobs)
}

const addTest = () => {
  setAddon({
    addWithInfo(storyName, info, storyFn) {
      const detectedStory = typeof info === 'function' ? info : storyFn
      return this.add.call(this, storyName, detectedStory)
    },
  })
}

if (isTest) {
  addTest()
} else {
  addAll()
}

const contexts = [
  // {storiesContexts}
]

const loadStories = () => {
  contexts.forEach(context => {
    context.keys().forEach(module => context(module))
  })
}

configure(loadStories, module)
