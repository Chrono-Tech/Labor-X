import PropTypes from 'prop-types'
import ProfileWorkerModel from "../../api/backend/model/ProfileWorkerModel"
import AttachmentModel from "../../api/backend/model/AttachmentModel"
import {

  WORKER_PROFILE_REVIEW_REQUEST,
  WORKER_PROFILE_REVIEW_SUCCESS,
  WORKER_PROFILE_REVIEW_FAILURE,

  SERVICE_ATTACHMENT_CREATE_REQUEST,
  SERVICE_ATTACHMENT_CREATE_SUCCESS,
  SERVICE_ATTACHMENT_CREATE_FAILURE,

} from "./actions"

export const WORKER_PROFILE_FORM = 'WORKER_PROFILE/FORM'

export const TYPES = {

  workerProfile: PropTypes.instanceOf(ProfileWorkerModel),
  reviewWorkerProfileLoading: PropTypes.bool,
  reviewWorkerProfileFailure: PropTypes.instanceOf(Error),

  avatar: PropTypes.instanceOf(ImageModel),
  createAvatarLoading: PropTypes.bool,
  createAvatarFailure: PropTypes.instanceOf(Error),

  serviceAttachments: PropTypes.arrayOf(PropTypes.instanceOf(AttachmentModel)),
  createServiceAttachmentLoading: PropTypes.bool,
  createServiceAttachmentFailure: PropTypes.instanceOf(Error),
}

export const STATE = {

  workerProfile: null,
  reviewWorkerProfileLoading: true,
  reviewWorkerProfileFailure: null,

  avatar: null,
  createAvatarLoading: false,
  createAvatarFailure: null,

  serviceAttachments: [],
  createServiceAttachmentLoading: false,
  createServiceAttachmentFailure: null,
}

/*eslint complexity: ["error", 44]*/
export default (state = STATE, { type, payload }) => {
  switch (type) {

    case WORKER_PROFILE_REVIEW_REQUEST: return ({
      ...state,
      reviewWorkerProfileLoading: true,
    })
    case WORKER_PROFILE_REVIEW_SUCCESS: return ({
      ...state,
      reviewWorkerProfileLoading: false,
      workerProfile: payload,
    })
    case WORKER_PROFILE_REVIEW_FAILURE: return ({
      ...state,
      reviewWorkerProfileLoading: false,
      reviewWorkerProfileFailure: payload,
    })


    case SERVICE_ATTACHMENT_CREATE_REQUEST: return ({
      ...state,
      createServiceAttachmentLoading: true,
    })
    case SERVICE_ATTACHMENT_CREATE_SUCCESS: return ({
      ...state,
      createServiceAttachmentLoading: false,
      serviceAttachments: [ ...state.serviceAttachments, { ...payload.attachment, name: payload.file.name } ],
    })
    case SERVICE_ATTACHMENT_CREATE_FAILURE: return ({
      ...state,
      createServiceAttachmentLoading: false,
      createServiceAttachmentFailure: payload,
    })
    default: return ({
      ...state,
    })

  }
}
