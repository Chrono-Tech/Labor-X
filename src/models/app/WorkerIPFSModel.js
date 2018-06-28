import PropTypes from 'prop-types'
import faker from 'faker'
import WorkerExperienceModel from './WorkerExperienceModel'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  hash: PropTypes.string.isRequired, // ipfs hash of the object itself
  registered: PropTypes.instanceOf(Date),
  website: PropTypes.string,
  email: PropTypes.string,
  description: PropTypes.string,
  experience: PropTypes.arrayOf(PropTypes.instanceOf(WorkerExperienceModel)),
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
    name: faker.company.companyName(),
    registered: props.since ? new Date(props.since) : new Date(faker.date.past()),
    website: faker.internet.url(),
    email: faker.internet.email(),
    description: faker.lorem.sentence(20),
    logo: faker.internet.avatar(),
    experience: [new WorkerExperienceModel({})],
  }, props)
}
