import translations from 'i18n'
import { I18n, loadTranslations, setLocale } from 'react-redux-i18n'

import { initTokens } from './tokens/actions'
import { initDAOs } from './daos/actions'
import { initBoards } from './boards/actions'
import { initJobs } from './jobs/actions'
import { signerSelector } from './wallet/selectors'

const startI18n = () => (dispatch, getState) => {
  I18n.setTranslationsGetter(() => getState().i18n.translations)
  I18n.setLocaleGetter(() => getState().i18n.locale)
  dispatch(loadTranslations(translations))
  // TODO @dkchv: hardcoded
  dispatch(setLocale('en'))
}

export const initBackend = () => async (dispatch) => {
  dispatch(startI18n())
}

export const initFrontend = (store) => ({ web3 }) => async (dispatch) => {
  await dispatch(initDAOs({ web3 }))
  await dispatch(initTokens({ web3 }))

  let previousAddress = null
  const handleSignerUpdate = () => {
    const currentSigner = signerSelector()(store.getState())
    const currentAddress = currentSigner != null // nil check
      ? currentSigner.address
      : null
    if (currentAddress !== previousAddress) {
      // eslint-disable-next-line
      console.log('Signer changed to ', currentAddress)
      previousAddress = currentAddress
      store.dispatch(initBoards())
      store.dispatch(initJobs())
    }
  }
  handleSignerUpdate()
  store.subscribe(handleSignerUpdate)
}
