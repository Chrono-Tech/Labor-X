import PropTypes from 'prop-types'
import faker from 'faker'
import AbstractModel from '../AbstractModel'

export const schemaFactory = () => ({
  isSpecified: PropTypes.bool,
  reviewCount: PropTypes.number,
  rating: PropTypes.number,
  validationLevel: PropTypes.number,
})

export default class JobProfileRequirementsModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  const {
    reviewCount,
    rating,
    validationLevel,
    ...other
  } = props
  return Object.assign({}, {
    isSpecified: faker.random.boolean(),
    reviewCount: reviewCount != null
      ? Number(reviewCount)
      : Number(faker.random.number({ min: 0, max: 40 })),
    rating: reviewCount != null
      ? Number(reviewCount)
      : Number(faker.random.number({ min: 0, max: 5 })),
    validationLevel: reviewCount != null
      ? Number(reviewCount)
      : Number(faker.random.number({ min: 0, max: 4 })),
  }, other)
}
