import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'

export const schemaFactory = () => ({
  emailCode: PropTypes.string,
  phoneCode: PropTypes.string,
})

export default class ProfileContactsConfirmationRequestModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
