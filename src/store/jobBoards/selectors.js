import { createSelector } from "reselect"

export const getState = state => state.jobBoards

export const boardsSelector = createSelector(
    getState,
    (state) => state.boards
)

export const getSelectInitialPropsLoading = createSelector(getState, state => state.selectInitialPropsLoading)
