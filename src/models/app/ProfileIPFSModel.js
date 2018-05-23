import PropTypes from 'prop-types'
import faker from 'faker'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  hash: PropTypes.string, // ipfs hash of the object itself
  name: PropTypes.string,
  logo: PropTypes.string, // Any supported URL path, including //example.com/path/to/image, https://example.com/path/to/image , ipfs://example.com/path/to/image
  isClient: PropTypes.bool,
  isWorker: PropTypes.bool,
  isRecruiter: PropTypes.bool,
})

export default class ProfileIPFSModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  return Object.assign({}, {
    name: faker.name.findName(),
    logo: faker.internet.avatar(),
    isClient: faker.random.boolean(),
    isWorker: faker.random.boolean(),
    isRecruiter: faker.random.boolean(),
  }, props)
}
