export const LANDING_HIDE_COOKIES_NOTICE = 'landing/hideCookiesNotice'
export const LANDING_GET_COOKIES_NOTICE_VALUE = 'landing/getCookiesNoticeValue'

export const hideCookiesNotice = () => (dispatch) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('isHideCookiesNotice', true)
    dispatch({ type: LANDING_HIDE_COOKIES_NOTICE })
  }
}

export const getCookiesNoticeValue = () => (dispatch) => {
  if (typeof window !== 'undefined') {
    const isHideCookiesNotice = localStorage.getItem('isHideCookiesNotice') === 'true'
    dispatch({ type: LANDING_GET_COOKIES_NOTICE_VALUE, data: isHideCookiesNotice })
  }
}
