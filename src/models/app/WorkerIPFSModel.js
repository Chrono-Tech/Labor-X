import PropTypes from 'prop-types'
import faker from 'faker'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  hash: PropTypes.string.isRequired, // ipfs hash of the object itself
  name: PropTypes.string,
  avatar: PropTypes.string, // Any supported URL path, including //example.com/path/to/image, https://example.com/path/to/image , ipfs://example.com/path/to/image
})

export default class WorkerIPFSModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.assign(this, propsWithDefaults(props))
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  return Object.assign({}, {
    hash: faker.random.uuid(),
    name: faker.name.findName(),
    avatar: faker.internet.avatar(),
  }, props)
}
