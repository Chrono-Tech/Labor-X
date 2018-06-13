import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  key: PropTypes.string.isRequired,
  jobId: PropTypes.number.isRequired,
  self: PropTypes.string.isRequired,
  resumedAt: PropTypes.instanceOf(Date),
})

export default class JobResumedEvent extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }
}
