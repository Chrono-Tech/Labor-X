import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'
// import {GENERAL_PROFILE_VALIDATION_STATE} from "./ProfileModel";

const schemaFactory = () => ({
  submitted: PropTypes.shape({
    email: PropTypes.string,
    phone: PropTypes.string,
    isEmailConfirmed: PropTypes.bool,
    isPhoneConfirmed: PropTypes.bool,
    validationComment: PropTypes.string,
  }),
  approved: PropTypes.shape({
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
})

export default class ProfileContactsModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }
}
