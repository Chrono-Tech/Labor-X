import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import ProfilePersonalModel from "../../api/backend/model/ProfilePersonalModel"

const schemaFactory = () => ({
  avatar: PropTypes.string,
  userName: PropTypes.string,
  birthDate: PropTypes.instanceOf(Date),
})

export default class ProfilePersonalFormModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
  }

  static fromProfilePersonalModel ({ approved, submitted } : ProfilePersonalModel) {
    const profile = submitted || approved
    return new ProfilePersonalFormModel(
      profile ? {
        avatar: profile.avatar.id,
        userName: profile.userName,
        birthDate: new Date(profile.birthDate),
      } : {}
    )
  }
}
