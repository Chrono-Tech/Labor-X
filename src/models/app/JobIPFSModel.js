import PropTypes from 'prop-types'
import faker from 'faker'
import AbstractModel from '../AbstractModel'
import JobAddressModel from './JobAddressModel'
import JobBudgetModel from './JobBudgetModel'
import JobPeriodModel from './JobPeriodModel'

const schemaFactory = () => ({
  hash: PropTypes.string,
  name: PropTypes.string,
  intro: PropTypes.string,
  responsibilities: PropTypes.string,
  requirements: PropTypes.string,
  logo: PropTypes.string,
  address: PropTypes.instanceOf(JobAddressModel),
  budget: PropTypes.instanceOf(JobBudgetModel),
  period: PropTypes.instanceOf(JobPeriodModel),
})

export default class JobIPFSModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  const {
    address,
    budget,
    period,
    ...data
  } = props
  return Object.assign({}, {
    name: faker.name.jobTitle(),
    intro: faker.lorem.sentence(10),
    responsibilities: faker.lorem.sentence(10),
    requirements: faker.lorem.sentence(10),
    logo: faker.internet.avatar(),
    address: new JobAddressModel(props.address || {}),
    budget: new JobBudgetModel(props.budget || {}),
    period: new JobPeriodModel(props.period || {}),
  }, data)
}
