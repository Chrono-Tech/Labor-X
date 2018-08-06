import { createSelector } from 'reselect'
import getFormValues from 'redux-form/lib/getFormValues'
import getFormNames from 'redux-form/lib/getFormNames'
import isValid from 'redux-form/lib/isValid'

import { ACCOUNT_PASSWORD_FORM, COPY_YOUR_ACCOUNT_PASSWORD_FORM, CONFIRM_BACK_UP_FORM } from "./constants"

export const stateSelector = (state) => state.auth.signup
export const mnemonicSelector = createSelector(stateSelector, (state) => state.mnemonic)
export const submitWelcomeLoadingSelector = createSelector(stateSelector, (state) => state.submitWelcomeLoading)
export const submitWelcomeFailureSelector = createSelector(stateSelector, (state) => state.submitWelcomeFailure)
export const accountPasswordFormValuesSelector = (state) => getFormValues(ACCOUNT_PASSWORD_FORM)(state)
export const copyYourAccountPasswordFormValuesSelector = (state) => getFormValues(COPY_YOUR_ACCOUNT_PASSWORD_FORM)(state)
export const confirmBackUpFormValuesSelector = (state) => getFormValues(CONFIRM_BACK_UP_FORM)(state)
export const isAccountPasswordFormExistsSelector = (state) => getFormNames()(state).includes(ACCOUNT_PASSWORD_FORM)
export const isCopyYourAccountPasswordFormExistsSelector = (state) => getFormNames()(state).includes(COPY_YOUR_ACCOUNT_PASSWORD_FORM)
export const isConfirmBackUpFormExistsSelector = (state) => getFormNames()(state).includes(CONFIRM_BACK_UP_FORM)
export const isCopyYourAccountPasswordConfirmedSelector = createSelector(copyYourAccountPasswordFormValuesSelector, (values) => values ? values.confirm : false)
export const isAccountPasswordFormValidSelector = (state) => isValid(ACCOUNT_PASSWORD_FORM)(state)
export const isConfirmBackUpFormValidSelector = (state) => isValid(CONFIRM_BACK_UP_FORM)(state)
export const mnemonicConfirmationSelector = createSelector(confirmBackUpFormValuesSelector, (values) => values ? values.mnemonicConfirmation : '')
