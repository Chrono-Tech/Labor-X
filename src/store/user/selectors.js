import { createSelector } from 'reselect'

export const stateSelector2 = (state) => state.user
export const logoutLoadingSelector = createSelector(stateSelector2, (state) => state.logoutLoading)
export const userSelector = () => (state) => state.user.user
export const userTokenSelector = () => createSelector(userSelector(), (user) => user.token)
export const userProfileSelector = () => createSelector(userSelector(), (user) => user.profile)
