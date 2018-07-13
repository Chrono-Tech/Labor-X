// @flow

import { createSelector } from 'reselect'

export const userSelector = () => (state: Object) => state.user.user

export const userTokenSelector = () => createSelector(
  userSelector(),
  (user) => user.token
)

export const userProfileSelector = () => createSelector(
  userSelector(),
  (user) => user.profile
)