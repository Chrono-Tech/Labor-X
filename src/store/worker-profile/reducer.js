import PropTypes from 'prop-types'
import ProfileWorkerModel from "../../api/backend/model/ProfileWorkerModel"
import AttachmentModel from "../../api/backend/model/AttachmentModel"
import ImageModel from "../../api/backend/model/ImageModel"

import {

  WORKER_PROFILE_REVIEW_REQUEST,
  WORKER_PROFILE_REVIEW_SUCCESS,
  WORKER_PROFILE_REVIEW_FAILURE,

  SERVICE_ATTACHMENT_CREATE_REQUEST,
  SERVICE_ATTACHMENT_CREATE_SUCCESS,
  SERVICE_ATTACHMENT_CREATE_FAILURE,

  GET_WORKER_PROFILE_REQUEST,
  GET_WORKER_PROFILE_SUCCESS,
  GET_WORKER_PROFILE_FAILURE,

  SERVICE_ATTACHMENT_DELETE

} from "./actions"

export const WORKER_PROFILE_FORM = 'WORKER_PROFILE/FORM'

export const TYPES = {

  workerProfile: PropTypes.instanceOf(ProfileWorkerModel),
  reviewWorkerProfileLoading: PropTypes.bool,
  reviewWorkerProfileFailure: PropTypes.instanceOf(Error),

  getWorkerProfileLoading: PropTypes.bool,
  getWorkerProfileFailure: PropTypes.instanceOf(Error),

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

  getWorkerProfileLoading: true,
  getWorkerProfileFailure: true,

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



    case GET_WORKER_PROFILE_REQUEST: return ({
      ...state,
      getWorkerProfileLoading: true,
    })
    case GET_WORKER_PROFILE_SUCCESS: return ({
      ...state,
      getWorkerProfileLoading: false,
      workerProfile: payload,
    })
    case GET_WORKER_PROFILE_FAILURE: return ({
      ...state,
      getWorkerProfileLoading: false,
      getWorkerProfileFailure: payload,
    })


    case SERVICE_ATTACHMENT_CREATE_REQUEST: return ({
      ...state,
      createServiceAttachmentLoading: true,
    })
    case SERVICE_ATTACHMENT_CREATE_SUCCESS: return ({
      ...state,
      createServiceAttachmentLoading: false,
      serviceAttachments: [ ...state.serviceAttachments, { ...payload.attachment, name: payload.file.name, serviceIndex: payload.serviceIndex } ],
    })
    case SERVICE_ATTACHMENT_CREATE_FAILURE: return ({
      ...state,
      createServiceAttachmentLoading: false,
      createServiceAttachmentFailure: payload,
    })

    case SERVICE_ATTACHMENT_DELETE: 
    const findedIndex = state.serviceAttachments.findIndex(item => item.id === payload);
    return ({
      ...state,
      serviceAttachments: findedIndex !==-1 ? [...state.serviceAttachments.slice(0, findedIndex), ...state.serviceAttachments.slice(findedIndex+1, state.serviceAttachments.length)] : state.serviceAttachments ,
    })

    default: return ({
      ...state,
    })

  }
}
