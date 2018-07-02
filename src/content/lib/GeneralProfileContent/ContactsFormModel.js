import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'
import ProfileContactsModel from "../../api/backend/model/ProfileContactsModel"

const schemaFactory = () => ({
  email: PropTypes.string,
  phone: PropTypes.string,
})

export default class ProfileContactsFormModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
  }

  static getInitialValues ({ approved, submitted } : ProfileContactsModel) {
    const profile = submitted || approved
    return new ProfileContactsFormModel(
      profile ? {
        email: profile.email,
        phone: profile.phone,
      } : {}
    )
  }

}
