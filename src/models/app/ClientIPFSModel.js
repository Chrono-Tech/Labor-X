import PropTypes from 'prop-types'
import faker from 'faker'
import AbstractModel from '../AbstractModel'
import ClientAddressModel from './JobAddressModel'

const schemaFactory = () => ({
  hash: PropTypes.string.isRequired, // ipfs hash of the object itself
  name: PropTypes.string,
  description: PropTypes.string,
  address: PropTypes.instanceOf(ClientAddressModel),
  logo: PropTypes.string, // Any supported URL path, including //example.com/path/to/image, https://example.com/path/to/image , ipfs://example.com/path/to/image
})

export default class ClientIPFSModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.assign(this, propsWithDefaults(props))
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  return Object.assign({}, {
    hash: faker.random.uuid(),
    name: faker.company.companyName(),
    description: faker.lorem.sentence(20),
    logo: faker.internet.avatar(),
    address: new ClientAddressModel(props.address || {}),
  }, props)
}
