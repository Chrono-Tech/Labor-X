import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'
import AttachmentModel from "./AttachmentModel";

const schemaFactory = () => ({
  submitted: PropTypes.shape({
    country: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    zip: PropTypes.string,
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    attachments: PropTypes.arrayOf(PropTypes.instanceOf(AttachmentModel)),
    validationComment: PropTypes.string
  }),
  approved: PropTypes.shape({
    country: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    zip: PropTypes.string,
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    attachments: PropTypes.arrayOf(PropTypes.instanceOf(AttachmentModel)),
  })
})

export default class ProfileResidenceModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
