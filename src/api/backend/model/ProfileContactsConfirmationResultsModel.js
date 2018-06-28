import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'
import ProfileModel from "./ProfileModel"

export const schemaFactory = () => ({
  profile: PropTypes.instanceOf(ProfileModel).isRequired,
  status: PropTypes.shape({
    isEmailTried: PropTypes.bool.isRequired,
    isEmailVerified: PropTypes.bool.isRequired,
    isPhoneTried: PropTypes.bool.isRequired,
    isPhoneVerified: PropTypes.bool.isRequired,
  }),
})

export default class ProfileContactsConfirmationResultsModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  static fromJson (data) {
    return new ProfileContactsConfirmationResultsModel({
      ...data,
      profile: ProfileModel.fromJson(data.profile),
    })
  }
}
