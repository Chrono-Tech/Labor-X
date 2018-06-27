import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'
import ProfilePersonalFormModel from "../../../models/form/ProfilePersonalFormModel"

export const schemaFactory = () => ({
  userName: PropTypes.string.isRequired,
  birthDate: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
})

export default class ProfilePersonalVerificationRequestModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  static fromProfilePersonalFormModel (data: ProfilePersonalFormModel) {
    return new ProfilePersonalVerificationRequestModel({
      userName: data.userName,
      birthDate: data.birthDate.toISOString(),
      avatar: data.avatar,
    })
  }
}
