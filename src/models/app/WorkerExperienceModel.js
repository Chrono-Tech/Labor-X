import PropTypes from 'prop-types'
import faker from 'faker'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  position: PropTypes.string,
  organization: PropTypes.string,
  responsibilities: PropTypes.string,
  since: PropTypes.instanceOf(Date),
  until: PropTypes.instanceOf(Date),
})

export default class WorkerExperienceModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.assign(this, propsWithDefaults(props))
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  return Object.assign({}, {
    position: faker.name.jobTitle(),
    organization: faker.company.companyName(),
    responsibilities: faker.lorem.sentence(),
    since: props.since ? new Date(props.since) : new Date(faker.date.past()),
    until: props.until ? new Date(props.until) : new Date(faker.date.past()),
  }, props)
}
