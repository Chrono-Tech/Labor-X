import PropTypes from 'prop-types'
import faker from 'faker'
import Chance from 'chance'
import AbstractModel from '../AbstractModel'
import JobAddressModel from './JobAddressModel'
import JobBudgetModel from './JobBudgetModel'
import JobPeriodModel from './JobPeriodModel'
import JobProfileRequirementsModel from './JobProfileRequirementsModel'

const chance = new Chance()

const schemaFactory = () => ({
  hash: PropTypes.string,
  name: PropTypes.string,
  refString: PropTypes.string,
  intro: PropTypes.string,
  responsibilities: PropTypes.arrayOf(PropTypes.string),
  minimumRequirements: PropTypes.arrayOf(PropTypes.string),
  preferredRequirements: PropTypes.arrayOf(PropTypes.string),
  conclusion: PropTypes.arrayOf(PropTypes.string),
  logo: PropTypes.string,
  address: PropTypes.instanceOf(JobAddressModel),
  budget: PropTypes.instanceOf(JobBudgetModel),
  period: PropTypes.instanceOf(JobPeriodModel),
  profileRequirements: PropTypes.instanceOf(JobProfileRequirementsModel),
  allowCustomOffer: PropTypes.bool,
  hourlyRating: PropTypes.number,
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
    responsibilities,
    profileRequirements,
    ...data
  } = props
  return Object.assign({}, {
    name: faker.name.jobTitle(),
    refString: `# J-AA-${faker.random.alphaNumeric(4).toUpperCase()}`,
    intro: faker.lorem.sentence(10),
    responsibilities: responsibilities != null
      ? [].concat(responsibilities)
      : [...Array(chance.integer({ min: 1, max: 10 }))].map(() => faker.lorem.sentence(10)),
    minimumRequirements: [...Array(chance.integer({ min: 1, max: 10 }))].map(() => faker.lorem.sentence(10)),
    preferredRequirements: [...Array(chance.integer({ min: 1, max: 10 }))].map(() => faker.lorem.sentence(10)),
    conclusion: [...Array(chance.integer({ min: 1, max: 10 }))].map(() => faker.lorem.sentence(10)),
    logo: faker.internet.avatar(),
    address: new JobAddressModel(props.address || {}),
    budget: new JobBudgetModel(props.budget || {}),
    period: new JobPeriodModel(props.period || {}),
    profileRequirements: new JobProfileRequirementsModel(props.profileRequirements || {}),
    allowCustomOffer: true,
    hourlyRating: 1,
  }, data)
}
