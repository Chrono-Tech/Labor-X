import translations from 'i18n'
import { I18n, loadTranslations, setLocale } from 'react-redux-i18n'
import { Router } from 'src/routes'

import { initTokens } from './tokens/actions'
import { initDAOs } from './daos/actions'
import { unrestrictedPages, logoutFinished } from './login/actions'
import { initBoards } from './boards/actions'
import { initJobs } from './jobs/actions'
import { logout } from './wallet/actions'
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
    const state = store.getState()
    const currentSigner = signerSelector()(state)
    const currentAddress = currentSigner != null // nil check
      ? currentSigner.address
      : null

    if (Router.route && Router.route === '/') {
      store.dispatch(logoutFinished())
    }

    if (!currentSigner && !state.login.logoutStarted && Router.route && !unrestrictedPages.some((page) => page === Router.route)) {
      store.dispatch(logout())
    }

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
