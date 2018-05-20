import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

const schemaFactory = () => ({
  key: PropTypes.string.isRequired,
  jobId: PropTypes.number.isRequired,
  self: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  skillsTagsMask: PropTypes.number.isRequired, // bit-mask,
  skillsTagsAreaMask: PropTypes.number.isRequired, // bit-mask,
  skillsTagsCategoryMask: PropTypes.number.isRequired, // bit-mask,
  ipfsHash: PropTypes.string.isRequired,
  status: PropTypes.boolean,
})

export default class JobPostedEvent extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }
}
