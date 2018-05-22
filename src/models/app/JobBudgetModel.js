import PropTypes from 'prop-types'
import Chance from 'chance'
import AbstractModel from '../AbstractModel'

const chance = new Chance()

export const schemaFactory = () => ({
  isSpecified: PropTypes.bool,
  hourlyRate: PropTypes.string,
  totalHours: PropTypes.string,
})

export default class JobBudgetModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  return Object.assign({}, {
    isSpecified: false,
    hourlyRate: String(chance.integer(5, 40)),
    totalHours: String(chance.integer(1, 40) * 5),
  }, props)
}
