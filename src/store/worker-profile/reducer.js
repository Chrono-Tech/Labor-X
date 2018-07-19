import PropTypes from 'prop-types'
import ProfileWorkerModel from "../../api/backend/model/ProfileWorkerModel"
import AttachmentModel from "../../api/backend/model/AttachmentModel"
import ImageModel from "../../api/backend/model/ImageModel"
import CurrencyModel from "../../api/backend/model/CurrencyModel"
import ServiceCategoryModel from "../../api/backend/model/ServiceCategoryModel"

import {

  WORKER_PROFILE_SUMBIT_REQUEST,
  WORKER_PROFILE_SUMBIT_SUCCESS,
  WORKER_PROFILE_SUMBIT_FAILURE,

  SERVICE_ATTACHMENT_CREATE_REQUEST,
  SERVICE_ATTACHMENT_CREATE_SUCCESS,
  SERVICE_ATTACHMENT_CREATE_FAILURE,

  GET_WORKER_PROFILE_REQUEST,
  GET_WORKER_PROFILE_SUCCESS,
  GET_WORKER_PROFILE_FAILURE,

  WORKER_PAGE_DATA_REQUEST,
  WORKER_PAGE_DATA_SUCCESS,
  WORKER_PAGE_DATA_FAILURE,

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

  serviceCategories:  PropTypes.arrayOf(PropTypes.instanceOf(ServiceCategoryModel)),
  currencies:  PropTypes.arrayOf(PropTypes.instanceOf(CurrencyModel)),
  workerPageDataLoading:  PropTypes.bool,
  workerPageDataFailure: PropTypes.instanceOf(Error),
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

  serviceCategories: [],
  currencies: [],
  workerPageDataLoading: true,
  workerPageDataFailure: null,
}

/*eslint complexity: ["error", 44]*/
export default (state = STATE, { type, payload }) => {
  switch (type) {
    case WORKER_PAGE_DATA_REQUEST: return ({
      ...state,
      workerPageDataLoading: true,
    })
    case WORKER_PAGE_DATA_SUCCESS: return ({
      ...state,
      workerPageDataLoading: false,
      serviceCategories: payload.serviceCategories,
      currencies: payload.currencies
    })
    case WORKER_PAGE_DATA_FAILURE: return ({
      ...state,
      workerPageDataLoading: false,
      workerPageDataFailure: payload,
    })


    case WORKER_PROFILE_SUMBIT_REQUEST: return ({
      ...state,
      reviewWorkerProfileLoading: true,
    })
    case WORKER_PROFILE_SUMBIT_SUCCESS: return ({
      ...state,
      reviewWorkerProfileLoading: false,
      workerProfile: payload,
    })
    case WORKER_PROFILE_SUMBIT_FAILURE: return ({
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
