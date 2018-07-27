import PropTypes from 'prop-types'

import AbstractModel from 'src/models/AbstractModel'
import Icon from "src/components/common/Icon/Icon"
import css from 'src/content/lib/GeneralProfileContent/index.scss'
import ProfilePersonalModel from "./ProfilePersonalModel"
import ProfileContactsModel from "./ProfileContactsModel"
import ProfilePassportModel from "./ProfilePassportModel"
import ProfileLocationModel from "./ProfileLocationModel"
import ProfileNotifications from "./ProfileNotifications"

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
export const VALIDATION_STATE_ICON = {
  [VALIDATION_STATE.INITIAL]: Icon.SETS.SECURITY_SHIELD,
  [VALIDATION_STATE.WAITING]: Icon.SETS.SECURITY_SHIELD,
  [VALIDATION_STATE.WARNING]: Icon.SETS.SECURITY_SHIELD,
  [VALIDATION_STATE.SUCCESS]: Icon.SETS.SECURITY_CHECK,
}
export const VALIDATION_STATE_CLASS = {
  [VALIDATION_STATE.INITIAL]: css.cardActionTitle,
  [VALIDATION_STATE.WAITING]: css.cardActionTitleWarning,
  [VALIDATION_STATE.WARNING]: css.cardActionTitleError,
  [VALIDATION_STATE.SUCCESS]: css.cardActionTitleSuccess,
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
})

export default class ProfileModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  // getGeneralVerificationLevel () {
  //   if (!(this.level1 && this.level1.approved)) return 0
  //   if (!(this.level2 && this.level2.approved)) return 1
  //   if (!(this.level3 && this.level3.approved)) return 2
  //   if (!(this.level4 && this.level4.approved)) return 3
  //   return 4
  // }
  //
  // isGeneralApproved () {
  //   return this.getGeneralVerificationLevel() === 4
  // }

  static fromJson (data) {
    return new ProfileModel({
      ...data,
      level1: new ProfilePersonalModel(data.level1),
      level2: new ProfileContactsModel(data.level2),
      level3: new ProfilePassportModel(data.level3),
      level4: new ProfileLocationModel(data.level4),
      notifications: {
        laborx: {
          sms: new ProfileNotifications(data.notifications.laborx.sms),
          email: new ProfileNotifications(data.notifications.laborx.email),
        },
      },
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

