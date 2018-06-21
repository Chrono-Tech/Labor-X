import PropTypes from 'prop-types'
import faker from 'faker'
import AbstractModel from '../AbstractModel'
import ClientAddressModel from './JobAddressModel'

const schemaFactory = () => ({
  hash: PropTypes.string.isRequired, // ipfs hash of the object itself
  name: PropTypes.string, // do not use this field - use from according ProfileModel
  logo: PropTypes.string, // do not use this field - use from according ProfileModel
  registered: PropTypes.instanceOf(Date),
  website: PropTypes.string,
  email: PropTypes.string,
  description: PropTypes.string,
  address: PropTypes.instanceOf(ClientAddressModel),
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
    registered: props.since ? new Date(props.since) : new Date(faker.date.past()),
    website: faker.internet.url(),
    email: faker.internet.email(),
    description: faker.lorem.sentence(20),
    logo: faker.internet.avatar(),
    address: new ClientAddressModel(props.address || {}),
  }, props)
}
