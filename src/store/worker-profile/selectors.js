import { createSelector } from "reselect"

export const getState = state => state.workerProfile
export const getAvatar = createSelector(getState, state => state.avatar)

export const getServiceAttachments = createSelector(getState, state => state.serviceAttachments)


