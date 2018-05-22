import PropTypes from 'prop-types'
import Chance from 'chance'
import AbstractModel from '../AbstractModel'

const chance = new Chance()

const schemaFactory = () => ({
  finalizedAt: PropTypes.date,
  offersCount: PropTypes.number,
  applicantsCount: PropTypes.number,
})

export default class JobExtraModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  return Object.assign({}, {
    applicantsCount: chance.integer({ min: 10, max: 20 }),
    offersCount: chance.integer({ min: 0, max: 10 }),
  }, props)
}
