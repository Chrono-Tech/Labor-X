import PropTypes from 'prop-types'
import Chance from 'chance'
import AbstractModel from '../AbstractModel'

const chance = new Chance()

export const schemaFactory = () => ({
  isSpecified: PropTypes.bool,
  state: PropTypes.string,
  city: PropTypes.string,
  zip: PropTypes.string,
  street: PropTypes.string,
  building: PropTypes.string,
  suit: PropTypes.string,
})

export default class ClientAddressModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }

  get location () {
    return `${this.building}${this.suit ? '/' + this.suit : ''}, ${this.street}, ${this.city}, ${this.state}`
  }
}

function propsWithDefaults (props) {
  return Object.assign({}, {
    isSpecified: false,
    state: chance.state({ full: true }),
    city: chance.city(),
    zip: chance.zip(),
    street: chance.street(),
    building: '' + chance.integer({ min: 1, max: 100 }),
    suit: '' + chance.integer({ min: 11, max: 169 }),
  }, props)
}
