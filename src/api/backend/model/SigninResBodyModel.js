import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'
import ProfileModel from "./ProfileModel";

const schemaFactory = () => ({
  token: PropTypes.string.isRequired,
  profile: PropTypes.instanceOf(ProfileModel)
})

export default class SigninResBodyModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  static fromJson (data) {
    if (data == null) return null
    return new SigninResBodyModel({
      ...data,
      profile: ProfileModel.fromJson(data.profile)
    })
  }
}
