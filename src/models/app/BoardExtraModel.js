import PropTypes from 'prop-types'
import Chance from 'chance'
import AbstractModel from '../AbstractModel'

const chance = new Chance()

const schemaFactory = () => ({
  rating: PropTypes.number,
  validationLevel: PropTypes.number,
  clientsCount: PropTypes.number, // works as binded users count now
  jobsCount: PropTypes.number,
  isSignerJoined: PropTypes.bool,
})

export default class BoardExtraModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.assign(this, propsWithDefaults(props))
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  return Object.assign({}, {
    rating: chance.integer({ min: 1, max: 5 }),
    validationLevel: chance.integer({ min: 0, max: 3 }),
    clientsCount: chance.integer({ min: 0, max: 20 }),
    jobsCount: chance.integer({ min: 0, max: 20 }),
  }, props)
}
