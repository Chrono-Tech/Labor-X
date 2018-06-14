import PropTypes from 'prop-types'
import Chance from 'chance'
import faker from 'faker'
import AbstractModel from '../AbstractModel'

const chance = new Chance()

const schemaFactory = () => ({
  hash: PropTypes.string.isRequired, // ipfs hash of the object itself
  appliedDate: PropTypes.instanceOf(Date),
})

export default class JobOfferIPFSModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  const { hash, appliedDate, ...other } = props
  return Object.assign({}, {
    hash: faker.random.uuid(),
    appliedDate: props.appliedDate ? new Date(props.appliedDate) : chance.date(),
  }, other)
}
