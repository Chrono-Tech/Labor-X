import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'
import ImageModel from "./ImageModel"
// import {GENERAL_PROFILE_VALIDATION_STATE} from "./ProfileModel";

const schemaFactory = () => ({
  submitted: PropTypes.shape({
    userName: PropTypes.string,
    birthDate: PropTypes.string,
    avatar: PropTypes.instanceOf(ImageModel),
    validationComment: PropTypes.string,
  }),
  approved: PropTypes.shape({
    userName: PropTypes.string,
    birthDate: PropTypes.string,
    avatar: PropTypes.instanceOf(ImageModel),
  }),
})

export default class ProfilePersonalModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  // getValidationState () {
  //   const { submitted, approved } = this
  //   if (!submitted && !approved) return GENERAL_PROFILE_VALIDATION_STATE.INITIAL
  //   if (submitted && !submitted.validationComment) return GENERAL_PROFILE_VALIDATION_STATE.WAITING
  //   if (submitted && submitted.validationComment) return GENERAL_PROFILE_VALIDATION_STATE.WARNING
  //   if (!submitted && approved) return GENERAL_PROFILE_VALIDATION_STATE.SUCCESS
  // }

  getSubmittedAvatar () {
    return this.submitted ? this.submitted.avatar : null
  }

  getApprovedAvatar () {
    return this.approved ? this.approved.avatar : null
  }

  getValidationComment () {
    return this.submitted ? this.submitted.validationComment : null
  }

}
