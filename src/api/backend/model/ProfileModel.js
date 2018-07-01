import PropTypes from 'prop-types'
import AbstractModel from './../../../models/AbstractModel'
import ProfilePersonalModel from "./ProfilePersonalModel"
import ProfileContactsModel from "./ProfileContactsModel"
import ProfilePassportModel from "./ProfilePassportModel"
import ProfileLocationModel from "./ProfileLocationModel"
import ProfileNotifications from "./ProfileNotifications"
import ProfileClientModel from "./ProfileClientModel"
import ProfileWorkerModel from "./ProfileWorkerModel"
import ProfileRecruiterModel from "./ProfileRecruiterModel"

export const VALIDATION_STATE = {
  INITIAL: 'INITIAL',
  WAITING: 'WAITING',
  WARNING: 'WARNING',
  SUCCESS: 'SUCCESS',
}
export const VALIDATION_STATE_TITLE = {
  [VALIDATION_STATE.INITIAL]: 'Validate',
  [VALIDATION_STATE.WAITING]: 'Validation is on review',
  [VALIDATION_STATE.WARNING]: 'Validation issue',
  [VALIDATION_STATE.SUCCESS]: 'Validated',
}

export const schemaFactory = () => ({
  id: PropTypes.string.isRequired,
  ipfsHash: PropTypes.string,
  level1: PropTypes.instanceOf(ProfilePersonalModel),
  level2: PropTypes.instanceOf(ProfileContactsModel),
  level3: PropTypes.instanceOf(ProfilePassportModel),
  level4: PropTypes.instanceOf(ProfileLocationModel),
  notifications: PropTypes.shape({
    laborx: PropTypes.shape({
      sms: PropTypes.instanceOf(ProfileNotifications),
      email: PropTypes.instanceOf(ProfileNotifications),
    }),
  }),
  client: PropTypes.instanceOf(ProfileClientModel),
  worker: PropTypes.instanceOf(ProfileWorkerModel),
  recruiter: PropTypes.instanceOf(ProfileRecruiterModel),
})

export default class ProfileModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  getGeneralVerificationLevel () {
    if (!(this.level1 && this.level1.approved)) return 0
    if (!(this.level2 && this.level2.approved)) return 1
    if (!(this.level3 && this.level3.approved)) return 2
    if (!(this.level4 && this.level4.approved)) return 3
    return 4
  }

  isGeneralApproved () {
    return this.getGeneralVerificationLevel() === 4
  }

  static fromJson (data) {
    return new ProfileModel({
      ...data,
      level1: new ProfilePersonalModel(data.level1),
      level2: new ProfileContactsModel(data.level2),
      level3: new ProfilePassportModel(data.level3),
      level4: new ProfileLocationModel(data.level4),
      // notifications: {
      //   laborx: {
      //     sms: new ProfileNotifications(data.notifications.laborx.sms),
      //     email: new ProfileNotifications(data.notifications.laborx.email),
      //   },
      // },
      // client: new ProfileClientModel({}),
      // worker: new ProfileWorkerModel({}),
      // recruiter: new ProfileRecruiterModel({}),
    })
  }

  get personal () { return this.level1 }
  get contacts () { return this.level2 }
  get passport () { return this.level3 }
  get location () { return this.level4 }

  static getValidationState (profile) {
    const { submitted, approved } = profile
    if (!submitted && !approved) return VALIDATION_STATE.INITIAL
    if (submitted && !submitted.validationComment) return VALIDATION_STATE.WAITING
    if (submitted && submitted.validationComment) return VALIDATION_STATE.WARNING
    if (!submitted && approved) return VALIDATION_STATE.SUCCESS
  }

  static getValidationComment (profile) {
    return profile.submitted && profile.submitted.validationComment
  }

}

