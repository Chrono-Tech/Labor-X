import { createSelector } from 'reselect'
import getFormValues from 'redux-form/lib/getFormValues'

import { FORM } from "./constants"

export const stateSelector = (state) => state.auth.signin
export const submitLoadingSelector = createSelector(stateSelector, state => state.submitLoading)
export const submitFailureSelector = createSelector(stateSelector, state => state.submitFailure)
export const formValuesSelector = (state) => getFormValues(FORM)(state)
