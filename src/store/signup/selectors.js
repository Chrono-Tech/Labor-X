import { createSelector } from 'reselect'
import formValueSelector from 'redux-form/lib/formValueSelector'
import getFormNames from 'redux-form/lib/getFormNames'
import getFormValues from 'redux-form/lib/getFormValues'

import {ACCOUNT_PASSWORD_FORM, CONFIRM_BACK_UP_FORM, COPY_YOUR_ACCOUNT_PASSWORD_FORM} from "./constants";

export const stateSelector = (state) => state.signup
export const mnemonicSelector = createSelector(stateSelector, (state) => state.mnemonic)
export const isAccountPasswordFormExistsSelector = (state) => getFormNames()(state).includes(ACCOUNT_PASSWORD_FORM)
export const isCopyYourAccountPasswordFormExistsSelector = (state) => getFormNames()(state).includes(COPY_YOUR_ACCOUNT_PASSWORD_FORM)
export const isConfirmBackUpFormExistsSelector = (state) => getFormNames()(state).includes(CONFIRM_BACK_UP_FORM)
export const mnemonicConfirmationSelector = (state) => formValueSelector(CONFIRM_BACK_UP_FORM)(state, 'mnemonicConfirmation')
export const accountPasswordFormValuesSelector = (state) => getFormValues(ACCOUNT_PASSWORD_FORM)(state)
export const submitWelcomeLoadingSelector = createSelector(stateSelector, (state) => state.submitWelcomeLoading)
export const submitWelcomeFailureSelector = createSelector(stateSelector, (state) => state.submitWelcomeFailure)

