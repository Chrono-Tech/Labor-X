import { createSelector } from "reselect"
import moment from 'moment'
import groupBy from 'lodash/groupBy'

export const getState = state => state.createJob

export const getSelectInitialPropsLoading = createSelector(getState, state => state.selectInitialPropsLoading)

export const getMyConnectedBoards = createSelector(
    getState,
    state => state.myConnectedBoards
)
