import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'

export const schemaFactory = () => ({
  country: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
  addressLine1: PropTypes.string.isRequired,
  addressLine2: PropTypes.string.isRequired,
  attachments: PropTypes.arrayOf(PropTypes.string).isRequired,
})

export default class VerificationRequestLevel4Model extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
