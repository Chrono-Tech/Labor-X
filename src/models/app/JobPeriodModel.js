import PropTypes from 'prop-types'
import Chance from 'chance'
import AbstractModel from '../AbstractModel'

const chance = new Chance()

export const schemaFactory = () => ({
  isSpecified: PropTypes.bool,
  since: PropTypes.instanceOf(Date),
  until: PropTypes.instanceOf(Date),
})

export default class JobPeriodModel extends AbstractModel {
  constructor (props) {
    super(propsWithDefaults(props), schemaFactory())
    Object.freeze(this)
  }
}

function propsWithDefaults (props) {
  return Object.assign({}, {
    isSpecified: false,
  }, props, {
    since: props.since ? new Date(props.since) : chance.date(),
    until: props.until ? new Date(props.until) : chance.date(),
  })
}
