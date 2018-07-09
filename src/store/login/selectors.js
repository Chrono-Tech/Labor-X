import { createSelector } from 'reselect'
import { formValueSelector } from 'redux-form'

import { LoginSteps } from './actions'
import {web3Selector} from "../ethereum/selectors";
import {FORM_PRIVATE_KEY} from "../../components/Login";

export const getState = state => state.login
export const getPrevStep = createSelector(getState, state => state.prevStep)
export const getStep = createSelector(getState, state => state.step)
export const getOpenAccount404Dialog = createSelector(getState, state => state.openAccount404Dialog)

export const getAccount = createSelector(
  getStep,
  web3Selector(),
  state => formValueSelector(FORM_PRIVATE_KEY)(state, 'key'),
  (step, web3, privateKey) => {
    switch (step) {
      case LoginSteps.PrivateKey:
        return web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`)
    }
  }
)
