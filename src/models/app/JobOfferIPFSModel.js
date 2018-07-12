import PropTypes from 'prop-types'
import faker from 'faker'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  hash: PropTypes.string.isRequired, // ipfs hash of the object itself
  message: PropTypes.string,
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
    message: faker.lorem.sentence(),
    appliedDate: props.appliedDate ? new Date(props.appliedDate) : faker.date.future(),
  }, other)
}
