import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'

const schemaFactory = () => ({
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  mimetype: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
})

export default class AttachmentModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.assign(this, props)
    Object.freeze(this)
  }
}
