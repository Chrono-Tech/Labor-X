import PropTypes from 'prop-types'
import ProfileModel from "../../api/backend/model/ProfileModel"
import ImageModel from "../../api/backend/model/ImageModel"
import AttachmentModel from "../../api/backend/model/AttachmentModel"
import {

  PROFILE_REVIEW_REQUEST,
  PROFILE_REVIEW_SUCCESS,
  PROFILE_REVIEW_FAILURE,

  PERSONAL_SUBMIT_REQUEST,
  PERSONAL_SUBMIT_SUCCESS,
  PERSONAL_SUBMIT_FAILURE,

  CONTACTS_SUBMIT_REQUEST,
  CONTACTS_SUBMIT_SUCCESS,
  CONTACTS_SUBMIT_FAILURE,

  PASSPORT_SUBMIT_REQUEST,
  PASSPORT_SUBMIT_SUCCESS,
  PASSPORT_SUBMIT_FAILURE,

  LOCATION_SUBMIT_REQUEST,
  LOCATION_SUBMIT_SUCCESS,
  LOCATION_SUBMIT_FAILURE,

  LOCATION_ATTACHMENT_CREATE_REQUEST,
  LOCATION_ATTACHMENT_CREATE_SUCCESS,
  LOCATION_ATTACHMENT_CREATE_FAILURE,

  PASSPORT_ATTACHMENT_CREATE_REQUEST,
  PASSPORT_ATTACHMENT_CREATE_SUCCESS,
  PASSPORT_ATTACHMENT_CREATE_FAILURE,

  PERSONAL_RESET,
  PASSPORT_RESET,
  LOCATION_RESET,

  AVATAR_CREATE_REQUEST,
  AVATAR_CREATE_SUCCESS,
  AVATAR_CREATE_FAILURE,

  VALIDATE_EMAIL_DIALOG_SHOW,
  VALIDATE_EMAIL_DIALOG_HIDE,

  VALIDATE_PHONE_DIALOG_SHOW,
  VALIDATE_PHONE_DIALOG_HIDE,

  EMAIL_CODE_RESEND_REQUEST,
  EMAIL_CODE_RESEND_SUCCESS,
  EMAIL_CODE_RESEND_FAILURE,

  PHONE_CODE_RESEND_REQUEST,
  PHONE_CODE_RESEND_SUCCESS,
  PHONE_CODE_RESEND_FAILURE,

  EMAIL_CODE_SUBMIT_REQUEST,
  EMAIL_CODE_SUBMIT_SUCCESS,
  EMAIL_CODE_SUBMIT_FAILURE,

  PHONE_CODE_SUBMIT_REQUEST,
  PHONE_CODE_SUBMIT_SUCCESS,
  PHONE_CODE_SUBMIT_FAILURE,

} from "./actions"

export const FORM_PERSONAL = 'GENERAL_PROFILE/FORM/PERSONAL'
export const FORM_CONTACTS = 'GENERAL_PROFILE/FORM/CONTACTS'
export const FORM_PASSPORT = 'GENERAL_PROFILE/FORM/PASSPORT'
export const FORM_LOCATION = 'GENERAL_PROFILE/FORM/LOCATION'
export const FORM_CONTACTS_EMAIL_CODE = 'GENERAL_PROFILE/FORM/CONTACTS_EMAIL_CODE'
export const FORM_CONTACTS_PHONE_CODE = 'GENERAL_PROFILE/FORM/CONTACTS_PHONE_CODE'

export const TYPES = {

  profile: PropTypes.instanceOf(ProfileModel),
  reviewProfileLoading: PropTypes.bool,
  reviewProfileFailure: PropTypes.instanceOf(Error),

  avatar: PropTypes.instanceOf(ImageModel),
  createAvatarLoading: PropTypes.bool,
  createAvatarFailure: PropTypes.instanceOf(Error),

  openValidateEmailDialog: PropTypes.bool,
  openValidatePhoneDialog: PropTypes.bool,

  resendEmailCodeLoading: PropTypes.bool,
  resendEmailCodeFailure: PropTypes.instanceOf(Error),

  resendPhoneCodeLoading: PropTypes.bool,
  resendPhoneCodeFailure: PropTypes.instanceOf(Error),

  submitEmailCodeLoading: PropTypes.bool,
  submitEmailCodeFailure: PropTypes.instanceOf(Error),

  submitPhoneCodeLoading: PropTypes.bool,
  submitPhoneCodeFailure: PropTypes.instanceOf(Error),

  profileContactsSubmitLoading: PropTypes.bool,
  profileContactsSubmitFailure: PropTypes.instanceOf(Error),

  passportAttachments: PropTypes.arrayOf(PropTypes.instanceOf(AttachmentModel)),
  createPassportAttachmentLoading: PropTypes.bool,
  createPassportAttachmentFailure: PropTypes.instanceOf(Error),

  locationAttachments: PropTypes.arrayOf(PropTypes.instanceOf(AttachmentModel)),
  createLocationAttachmentLoading: PropTypes.bool,
  createLocationAttachmentFailure: PropTypes.instanceOf(Error),

  submitPersonalLoading: PropTypes.bool,
  submitPersonalFailure: PropTypes.instanceOf(Error),

  submitContactsLoading: PropTypes.bool,
  submitContactsFailure: PropTypes.instanceOf(Error),

  submitPassportLoading: PropTypes.bool,
  submitPassportFailure: PropTypes.instanceOf(Error),

  submitLocationLoading: PropTypes.bool,
  submitLocationFailure: PropTypes.instanceOf(Error),

}

export const STATE = {

  profile: null,
  reviewProfileLoading: true,
  reviewProfileFailure: null,

  avatar: null,
  createAvatarLoading: false,
  createAvatarFailure: null,

  openValidateEmailDialog: false,
  openValidatePhoneDialog: false,

  resendEmailCodeLoading: false,
  resendEmailCodeFailure: null,

  resendPhoneCodeLoading: false,
  resendPhoneCodeFailure: null,

  submitEmailCodeLoading: false,
  submitEmailCodeFailure: null,

  submitPhoneCodeLoading: false,
  submitPhoneCodeFailure: null,

  passportAttachments: [],
  createPassportAttachmentLoading: false,
  createPassportAttachmentFailure: null,

  locationAttachments: [],
  createLocationAttachmentLoading: false,
  createLocationAttachmentFailure: null,

  submitPersonalLoading: false,
  submitPersonalFailure: null,

  submitContactsLoading: false,
  submitContactsFailure: null,

  submitPassportLoading: false,
  submitPassportFailure: null,

  submitLocationLoading: false,
  submitLocationFailure: null,

}

/*eslint complexity: ["error", 44]*/
export default (state = STATE, { type, payload }) => {
  switch (type) {

    case PROFILE_REVIEW_REQUEST: return ({
      ...state,
      reviewProfileLoading: true,
    })
    case PROFILE_REVIEW_SUCCESS: return ({
      ...state,
      reviewProfileLoading: false,
      profile: payload,
    })
    case PROFILE_REVIEW_FAILURE: return ({
      ...state,
      reviewProfileLoading: false,
      reviewProfileFailure: payload,
    })

    case PERSONAL_RESET: return ({
      ...state,
      avatar: null,
    })
    case PASSPORT_RESET: return ({
      ...state,
      passportAttachments: [],
    })
    case LOCATION_RESET: return ({
      ...state,
      locationAttachments: [],
    })

    case AVATAR_CREATE_REQUEST: return ({
      ...state,
      createAvatarLoading: true,
    })
    case AVATAR_CREATE_SUCCESS: return ({
      ...state,
      createAvatarLoading: false,
      avatar: payload,
    })
    case AVATAR_CREATE_FAILURE: return ({
      ...state,
      createAvatarLoading: false,
      createAvatarFailure: payload,
    })

    case PERSONAL_SUBMIT_REQUEST: return ({
      ...state,
      submitPersonalLoading: true,
    })
    case PERSONAL_SUBMIT_SUCCESS: return ({
      ...state,
      submitPersonalLoading: false,
      profile: payload,
    })
    case PERSONAL_SUBMIT_FAILURE: return ({
      ...state,
      submitPersonalLoading: false,
      submitPersonalFailure: payload,
    })

    case CONTACTS_SUBMIT_REQUEST: return ({
      ...state,
      submitContactsLoading: true,
    })
    case CONTACTS_SUBMIT_SUCCESS: return ({
      ...state,
      submitContactsLoading: false,
      profile: payload,
    })
    case CONTACTS_SUBMIT_FAILURE: return ({
      ...state,
      submitContactsLoading: false,
      submitContactsFailure: payload,
    })

    case PASSPORT_SUBMIT_REQUEST: return ({
      ...state,
      submitPassportLoading: true,
    })
    case PASSPORT_SUBMIT_SUCCESS: return ({
      ...state,
      submitPassportLoading: false,
      profile: payload,
    })
    case PASSPORT_SUBMIT_FAILURE: return ({
      ...state,
      submitPassportLoading: false,
      submitPassportFailure: payload,
    })

    case LOCATION_SUBMIT_REQUEST: return ({
      ...state,
      submitLocationLoading: true,
    })
    case LOCATION_SUBMIT_SUCCESS: return ({
      ...state,
      submitLocationLoading: false,
      profile: payload,
    })
    case LOCATION_SUBMIT_FAILURE: return ({
      ...state,
      submitLocationLoading: false,
      submitLocationFailure: payload,
    })

    case LOCATION_ATTACHMENT_CREATE_REQUEST: return ({
      ...state,
      createLocationAttachmentLoading: true,
    })
    case LOCATION_ATTACHMENT_CREATE_SUCCESS: return ({
      ...state,
      createLocationAttachmentLoading: false,
      locationAttachments: [ ...state.locationAttachments, { ...payload.attachment, name: payload.file.name } ],
    })
    case LOCATION_ATTACHMENT_CREATE_FAILURE: return ({
      ...state,
      createLocationAttachmentLoading: false,
      createLocationAttachmentFailure: payload,
    })

    case PASSPORT_ATTACHMENT_CREATE_REQUEST: return ({
      ...state,
      createPassportAttachmentLoading: true,
    })
    case PASSPORT_ATTACHMENT_CREATE_SUCCESS: return ({
      ...state,
      createPassportAttachmentLoading: false,
      passportAttachments: [ ...state.passportAttachments, { ...payload.attachment, name: payload.file.name } ],
    })
    case PASSPORT_ATTACHMENT_CREATE_FAILURE: return ({
      ...state,
      createPassportAttachmentLoading: false,
      createPassportAttachmentFailure: payload,
    })

    case VALIDATE_EMAIL_DIALOG_SHOW: return ({
      ...state,
      openValidateEmailDialog: true,
    })
    case VALIDATE_EMAIL_DIALOG_HIDE: return ({
      ...state,
      openValidateEmailDialog: false,
    })

    case VALIDATE_PHONE_DIALOG_SHOW: return ({
      ...state,
      openValidatePhoneDialog: true,
    })
    case VALIDATE_PHONE_DIALOG_HIDE: return ({
      ...state,
      openValidatePhoneDialog: false,
    })

    case EMAIL_CODE_RESEND_REQUEST: return ({
      ...state,
      resendEmailCodeLoading: true,
    })
    case EMAIL_CODE_RESEND_SUCCESS: return ({
      ...state,
      resendEmailCodeLoading: false,
      profile: payload,
    })
    case EMAIL_CODE_RESEND_FAILURE: return ({
      ...state,
      resendEmailCodeLoading: false,
      resendEmailCodeFailure: payload,
    })

    case PHONE_CODE_RESEND_REQUEST: return ({
      ...state,
      resendPhoneCodeLoading: true,
    })
    case PHONE_CODE_RESEND_SUCCESS: return ({
      ...state,
      resendPhoneCodeLoading: false,
      profile: payload,
    })
    case PHONE_CODE_RESEND_FAILURE: return ({
      ...state,
      resendPhoneCodeLoading: false,
      resendPhoneCodeFailure: payload,
    })

    case EMAIL_CODE_SUBMIT_REQUEST: return ({
      ...state,
      submitEmailCodeLoading: true,
    })
    case EMAIL_CODE_SUBMIT_SUCCESS: return ({
      ...state,
      submitEmailCodeLoading: false,
      profile: payload.profile,
    })
    case EMAIL_CODE_SUBMIT_FAILURE: return ({
      ...state,
      submitEmailCodeLoading: false,
      submitEmailCodeFailure: payload,
    })

    case PHONE_CODE_SUBMIT_REQUEST: return ({
      ...state,
      submitPhoneCodeLoading: true,
    })
    case PHONE_CODE_SUBMIT_SUCCESS: return ({
      ...state,
      submitPhoneCodeLoading: false,
      profile: payload.profile,
    })
    case PHONE_CODE_SUBMIT_FAILURE: return ({
      ...state,
      submitPhoneCodeLoading: false,
      submitPhoneCodeFailure: payload,
    })

    default: return ({
      ...state,
    })

  }
}
