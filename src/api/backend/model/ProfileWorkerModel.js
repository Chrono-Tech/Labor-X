import PropTypes from "prop-types"
import AbstractModel from './../../../models/AbstractModel'
import ProfileWorkerSocialModel from './ProfileWorkerSocialModel'
import ProfileWorkerServiceModel from './ProfileWorkerServiceModel'
import ProfileWorkerEmploymentModel from './ProfileWorkerEmploymentModel'
import CurrencyModel from './CurrencyModel'
import AttachmentModel from './AttachmentModel'

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

const schemaFactory = () => ({
  submitted: PropTypes.shape({
    regular: PropTypes.shape({
      currencies: PropTypes.arrayOf(PropTypes.instanceOf(CurrencyModel)),
      hourlyCharge: PropTypes.string,
    }),
    verifiable: PropTypes.shape({
      intro: PropTypes.string,
      pageBackground: PropTypes.string,
      attachments: PropTypes.arrayOf(PropTypes.instanceOf(AttachmentModel)),
    }),
    custom: PropTypes.any,
    socials: PropTypes.arrayOf(PropTypes.instanceOf(ProfileWorkerSocialModel)),
    services: PropTypes.arrayOf(PropTypes.instanceOf(ProfileWorkerServiceModel)),
    employments: PropTypes.arrayOf(PropTypes.instanceOf(ProfileWorkerEmploymentModel)),
    validationComment: PropTypes.string,
  }),
  approved: PropTypes.shape({
    regular: PropTypes.shape({
      currencies: PropTypes.arrayOf(PropTypes.instanceOf(CurrencyModel)),
      hourlyCharge: PropTypes.string,
    }),
    verifiable: PropTypes.shape({
      intro: PropTypes.string,
      pageBackground: PropTypes.string,
      attachments: PropTypes.arrayOf(PropTypes.instanceOf(AttachmentModel)),
    }),
    custom: PropTypes.any,
    socials: PropTypes.arrayOf(PropTypes.instanceOf(ProfileWorkerSocialModel)),
    services: PropTypes.arrayOf(PropTypes.instanceOf(ProfileWorkerServiceModel)),
    employments: PropTypes.arrayOf(PropTypes.instanceOf(ProfileWorkerEmploymentModel)),
  }),
})

export default class ProfileWorkerModel extends AbstractModel {
  constructor (props) {
    super(props, schemaFactory())
    Object.freeze(this)
  }

  static fromJson (data) {
    const profile = new ProfileWorkerModel(data)
    return profile
  }

  static getValidationState (profile) {
    if (profile) {
      const { submitted, approved } = profile
      if (!submitted && !approved) return VALIDATION_STATE.INITIAL
      if (submitted && !submitted.validationComment) return VALIDATION_STATE.WAITING
      if (submitted && submitted.validationComment) return VALIDATION_STATE.WARNING
      if (!submitted && approved) return VALIDATION_STATE.SUCCESS
    } else {
      return VALIDATION_STATE.INITIAL
    }
  }

  static getValidationComment (profile) {
    if (profile) {
      return profile.submitted && profile.submitted.validationComment
    }
    else {
      return ""
    }
  }
}
