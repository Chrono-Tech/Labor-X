import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import faker from 'faker'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  jobId: PropTypes.number.isRequired,
  totalHours: PropTypes.instanceOf(BigNumber),
  hourlyRate: PropTypes.instanceOf(BigNumber),
  ontop: PropTypes.instanceOf(BigNumber),
  worker: PropTypes.string.isRequired,
  fixedPrice: PropTypes.instanceOf(BigNumber),
})

export default class JobOfferFormModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  const {
    totalHours,
    hourlyRate,
    fixedPrice,
    ...other
  } = props
  return Object.assign({}, {
    isSpecified: true,
    hourlyRate: hourlyRate
      ? String(hourlyRate)
      : String(faker.random.number({ min: 5, max: 40 })),
    totalHours: totalHours
      ? String(totalHours)
      : String(faker.random.number({ min: 1, max: 40 })),
    fixedPrice: fixedPrice
      ? String(fixedPrice)
      : String(faker.random.number({ min: 1, max: 40 })),
  }, other)
}
