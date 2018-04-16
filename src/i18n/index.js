import validator from 'models/validator.lang'
import components from './components'
import terms from './terms'
import layouts from './layouts'
import nav from './nav'

export default {
  en: {
    validator,
    terms,
    nav,
    ...layouts,
    ...components,
  },
}
