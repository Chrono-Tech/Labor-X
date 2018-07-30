import PropTypes from 'prop-types'
import ProfileWorkerModel from "../../api/backend/model/ProfileWorkerModel"
import PersonModel from "../../api/backend/model/PersonModel"
import AttachmentModel from "../../api/backend/model/AttachmentModel"
import ImageModel from "../../api/backend/model/ImageModel"
import CurrencyModel from "../../api/backend/model/CurrencyModel"
import ServiceCategoryModel from "../../api/backend/model/ServiceCategoryModel"

import {

  WORKER_PROFILE_REQUEST,
  WORKER_PROFILE_SUCCESS,
  WORKER_PROFILE_FAILURE,

} from "./actions"


export const TYPES = {
  workerProfilesByAddress: PropTypes.instanceOf(ProfileWorkerModel),
  profilesByAddress: PropTypes.instanceOf(PersonModel),
  workerProfileLoading: PropTypes.bool,
  workerProfileFailure: PropTypes.instanceOf(Error),
}

export const STATE = {
  workerProfilesByAddress: {},
  profilesByAddress: {},
  workerProfileLoading: false,
  workerProfileFailure: null,
}

/*eslint complexity: ["error", 44]*/
export default (state = STATE, { type, payload }) => {
  switch (type) {

    case WORKER_PROFILE_REQUEST: return ({
      ...state,
      workerProfileLoading: true,
    })
    case WORKER_PROFILE_SUCCESS: return ({
      ...state,
      workerProfileLoading: false,
      workerProfilesByAddress:{
        ...state.workerProfilesByAddress,
        [payload.address]: payload.workerProfile
      },
      profilesByAddress:{ 
        ...state.profilesByAddress,
        [payload.address]: payload.profile
      },
    })
    case WORKER_PROFILE_FAILURE: return ({
      ...state,
      workerProfileLoading: false,
      workerProfileFailure: payload,
    })

    default: return ({
      ...state,
    })

  }
}
