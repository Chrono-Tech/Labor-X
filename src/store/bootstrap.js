import translations from 'i18n'
import { I18n, loadTranslations, setLocale } from 'react-redux-i18n'

const startI18n = () => (dispatch, getState) => {
  I18n.setTranslationsGetter(() => getState().i18n.translations)
  I18n.setLocaleGetter(() => getState().i18n.locale)
  dispatch(loadTranslations(translations))
  // TODO @dkchv: hardcoded
  dispatch(setLocale('en'))
}

export const bootstrap = () => async (dispatch) => {
  dispatch(startI18n())
}
