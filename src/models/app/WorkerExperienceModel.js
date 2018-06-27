import PropTypes from 'prop-types'
import faker from 'faker'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  position: PropTypes.string,
  organisation: PropTypes.string,
  responsibilities: PropTypes.string,
  workFrom: PropTypes.instanceOf(Date),
  workTo: PropTypes.instanceOf(Date),
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
    organisation: faker.company.companyName(),
    responsibilities: faker.lorem.sentence(),
    workFrom: props.workFrom ? new Date(props.workFrom) : new Date(faker.date.past()),
    workTo: props.workTo ? new Date(props.workTo) : new Date(faker.date.past()),
  }, props)
}
