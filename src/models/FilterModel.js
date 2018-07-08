import PropTypes from 'prop-types'
import AbstractModel from './AbstractModel'

const schemaFactory = () => ({
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
})

export default class FilterModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  static valueOf (index) {
    return FILTERS_LIST.find(x => x.index === index)
  }
}

export const FILTER_BY_DATE = new FilterModel({ index: 0, name: 'Date' })
export const FILTER_BY_BUDGET = new FilterModel({ index: 1, name: 'Budget' })
export const FILTER_BY_HOURLY_RATE = new FilterModel({ index: 2, name: 'Hourly rate' })
export const FILTER_BY_RATING = new FilterModel({ index: 3, name: 'Rating' })

export const FILTERS_LIST = [
  FILTER_BY_DATE,
  FILTER_BY_BUDGET,
  FILTER_BY_HOURLY_RATE,
  FILTER_BY_RATING,
]
