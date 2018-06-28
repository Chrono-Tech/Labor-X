import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'
import ProfileContactsFormModel from "../../../models/form/ProfileContactsFormModel"

export const schemaFactory = () => ({
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
})

export default class ProfileContactsVerificationRequestModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  static fromProfileContactsFormModel (data: ProfileContactsFormModel) {
    return new ProfileContactsVerificationRequestModel({
      email: data.email,
      phone: data.phone,
    })
  }
}
