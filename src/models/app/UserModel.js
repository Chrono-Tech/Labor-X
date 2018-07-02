import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import UserAccountTypesModel from './UserAccountTypesModel'
import SigninResBodyModel from "../../api/backend/model/SigninResBodyModel";
import ProfileModel from "../../api/backend/model/ProfileModel";

export const schemaFactory = () => ({
  token: PropTypes.string,
  profile: PropTypes.instanceOf(ProfileModel),
  accountTypes: PropTypes.instanceOf(UserAccountTypesModel),
})

export default class UserModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  static fromJson (data) {
    if (data == null) return null
    return new UserModel({
      token: data.token,
      profile: ProfileModel.fromJson(data.profile),
      accountTypes: new UserAccountTypesModel(data.accountTypes),
    })
  }
}
