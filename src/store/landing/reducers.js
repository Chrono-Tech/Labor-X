import * as actions from './actions'

const initialState = {
  isHideCookiesNotice: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.LANDING_HIDE_COOKIES_NOTICE:
      return {
        ...state,
        isHideCookiesNotice: true,
      }
    case actions.LANDING_GET_COOKIES_NOTICE_VALUE:
      return {
        ...state,
        isHideCookiesNotice: action.data,
      }
    default:
      return state
  }
}
