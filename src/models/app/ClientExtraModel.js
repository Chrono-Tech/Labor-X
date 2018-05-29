import PropTypes from 'prop-types'
import Chance from 'chance'
import AbstractModel from '../AbstractModel'

const chance = new Chance()

const schemaFactory = () => ({
  totalSpent: PropTypes.number,
  totalHires: PropTypes.number,
})

export default class ClientExtraModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.assign(this, propsWithDefaults(props))
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  return Object.assign({}, {
    totalSpent: chance.integer({ min: 10000, max: 100000 }),
    totalHires: chance.integer({ min: 0, max: 1000 }),
  }, props)
}
