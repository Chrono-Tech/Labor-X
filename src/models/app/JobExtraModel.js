import PropTypes from 'prop-types'
import faker from 'faker'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  publishedAt: PropTypes.instanceOf(Date),
  createdAt: PropTypes.instanceOf(Date),
  acceptedAt: PropTypes.instanceOf(Date),
  pendingStartAt: PropTypes.instanceOf(Date),
  startTime: PropTypes.instanceOf(Date),
  pendingFinishAt: PropTypes.instanceOf(Date),
  finishTime: PropTypes.instanceOf(Date),
  finalizedAt: PropTypes.instanceOf(Date),
  offersCount: PropTypes.number,
  offersDelta: PropTypes.number,
  applicantsCount: PropTypes.number,
  applicantsDelta: PropTypes.number,
})

export default class JobExtraModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  return Object.assign({}, {
    applicantsCount: faker.random.number({ min: 10, max: 20 }),
    applicantsDelta: faker.random.number({ min: 0, max: 2 }),
    offersCount: faker.random.number({ min: 0, max: 10 }),
    offersDelta: faker.random.number({ min: 0, max: 2 }),
  }, props)
}
