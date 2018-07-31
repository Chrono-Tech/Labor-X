// @flow
import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import faker from 'faker'
import AbstractModel from '../AbstractModel'
import { FlowTypeModel, WORKFLOW_TM, WORKFLOW_FIXED_PRICE, WORKFLOW_NOT_SET } from './FlowTypeModel'

export const schemaFactory = () => ({
  isSpecified: PropTypes.bool,
  hourlyRate: PropTypes.string,
  totalHours: PropTypes.string,
  fixedPrice: PropTypes.string,
})

export default class JobBudgetModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }

  get award (): BigNumber {
    if (this.isSpecified) {
      const a = new BigNumber(this.hourlyRate)
      const b = new BigNumber(this.totalHours)
      return a.multipliedBy(b)
    }
    return null
  }

  get awardUSD (): BigNumber {
    if (this.isSpecified) {
      return this.award.multipliedBy(40)
    }
    return null
  }

  get hourlyRateAward (): BigNumber {
    if (this.isSpecified) {
      return new BigNumber(this.hourlyRate)
    }
    return null
  }
  get hourlyRateAwardUSD (): BigNumber {
    if (this.isSpecified) {
      return this.hourlyRateAward.multipliedBy(40)
    }
    return null
  }

  get flowType (): FlowTypeModel {
    if (this.fixedPrice) {
      return WORKFLOW_FIXED_PRICE
    }
    if (this.hourlyRate && this.totalHours) {
      return WORKFLOW_TM
    }
    return WORKFLOW_NOT_SET
  }
}

function propsWithDefaults (props) {
  const {
    hourlyRate,
    totalHours,
    fixedPrice,
    ...other
  } = props
  return Object.assign({}, {
    isSpecified: true,
    hourlyRate: hourlyRate != null
      ? String(hourlyRate)
      : String(faker.random.number({ min: 5, max: 40 })),
    totalHours: totalHours != null
      ? String(totalHours)
      : String(faker.random.number({ min: 1, max: 40 }) * 5),
    fixedPrice: fixedPrice
      ? String(fixedPrice)
      : (faker.random.boolean() ? String(faker.random.number({ min: 1, max: 40 })) : null),
  }, other)
}
