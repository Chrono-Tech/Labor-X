import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'
import AttachmentModel from "./AttachmentModel";

const schemaFactory = () => ({
  submitted: PropTypes.shape({
    passport: PropTypes.string,
    expirationDate: PropTypes.string,
    attachments: PropTypes.arrayOf(PropTypes.instanceOf(AttachmentModel)),
    validationComment: PropTypes.string,
  }),
  approved: PropTypes.shape({
    passport: PropTypes.string,
    expirationDate: PropTypes.string,
    attachments: PropTypes.arrayOf(PropTypes.instanceOf(AttachmentModel)),
  })
})

export default class ProfileLevel3Model extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
