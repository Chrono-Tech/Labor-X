import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'

export const schemaFactory = () => ({
  passport: PropTypes.string.isRequired,
  expirationDate: PropTypes.string.isRequired,
  attachments: PropTypes.arrayOf(PropTypes.string).isRequired,
})

export default class VerificationRequestPassportModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
