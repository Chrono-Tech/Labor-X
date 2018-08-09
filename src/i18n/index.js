import validator from 'models/validator.lang'
import terms from './terms'
import layouts from './layouts'
import nav from './nav'
import tip from './tip'
import ui from './ui'

export default {
  en: {
    validator,
    terms,
    nav,
    tip,
    ui,
    ...layouts,
  },
}
