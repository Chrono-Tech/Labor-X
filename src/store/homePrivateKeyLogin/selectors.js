import { createSelector } from "reselect"
import formValueSelector from "redux-form/lib/formValueSelector"
import {FORM} from "./constants";

export const stateSelector = (state) => state.homePrivateKeyLogin
export const getSubmitLoadingSelector = createSelector(stateSelector, (state) => state.submitLoading)
export const privateKeySelector = (state) => formValueSelector(FORM)(state, 'privateKey')
export const openAccount404DialogSelector = createSelector(stateSelector, (state) => state.openAccount404Dialog)