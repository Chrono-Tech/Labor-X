import PropTypes from 'prop-types'
import faker from 'faker'
import AbstractModel from '../AbstractModel'

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
    since: props.since ? new Date(props.since) : faker.date.future(),
    until: props.until ? new Date(props.until) : faker.date.future(),
  })
}
