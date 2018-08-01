import { createSelector } from "reselect"
import formValueSelector from "redux-form/lib/formValueSelector"
import {FORM} from "./constants";

export const stateSelector = (state) => state.homePrivateKeyLogin
export const getSubmitLoadingSelector = createSelector(stateSelector, (state) => state.submitLoading)
export const privateKeySelector = (state) => formValueSelector(FORM)(state, 'privateKey')
// export const personSelector = createSelector(stateSelector, (state) => state.person)
// export const addressSelector = createSelector(stateSelector, (state) => state.address)
// export const getSigninLoadingSelector = createSelector(stateSelector, (state) => state.signinLoading)