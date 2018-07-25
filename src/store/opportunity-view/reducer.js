import PropTypes from 'prop-types'
import {
  COMPANY_INFO_REQUEST,
  COMPANY_INFO_SUCCESS,
  COMPANY_INFO_FAILURE,
} from "./actions"


export const TYPES = {
  companyInfo: PropTypes.any,
  companyInfoLoading: PropTypes.bool,
  companyInfoFailure: PropTypes.instanceOf(Error),
}

export const STATE = {
  companyInfo: null,
  companyInfoLoading: true,
  companyInfoFailure: null,
}

/*eslint complexity: ["error", 44]*/
export default (state = STATE, { type, payload }) => {
  switch (type) {

    case COMPANY_INFO_REQUEST: return ({
      ...state,
      companyInfoLoading: true,
    })
    case COMPANY_INFO_SUCCESS: return ({
      ...state,
      companyInfoLoading: false,
      companyInfo: payload,
    })
    case COMPANY_INFO_FAILURE: return ({
      ...state,
      companyInfoLoading: false,
      companyInfoFailure: payload,
    })

    default: return ({
      ...state,
    })

  }
}