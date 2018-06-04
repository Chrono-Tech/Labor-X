import PropTypes from 'prop-types'
import Chance from 'chance'
import faker from 'faker'
import AbstractModel from '../AbstractModel'
import { WORKER_STATES_LIST } from './WorkerStateModel'

const chance = new Chance()

const schemaFactory = () => ({
  rating: PropTypes.number,
  validationLevel: PropTypes.number,
  state: PropTypes.oneOf(WORKER_STATES_LIST),
})

export default class WorkerExtraModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.assign(this, propsWithDefaults(props))
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  return Object.assign({}, {
    rating: chance.integer({ min: 1, max: 5 }),
    validationLevel: chance.integer({ min: 1, max: 4 }),
    state: faker.random.arrayElement(WORKER_STATES_LIST),
  }, props)
}
