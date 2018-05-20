import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  key: PropTypes.string.isRequired,
  jobId: PropTypes.number.isRequired,
  self: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  skills: PropTypes.number.isRequired, // bit-mask,
  skillsArea: PropTypes.number.isRequired, // bit-mask,
  skillsCategory: PropTypes.number.isRequired, // bit-mask,
  detailsIPFSHash: PropTypes.string.isRequired,
  bindStatus: PropTypes.bool,
})

export default class JobPostedEvent extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }
}
