import { createSelector } from "reselect"

export const getState = state => state.jobBoards

export const boardCardsSelector = createSelector(
    getState,
    (state) => state.cards
)

export const getSelectInitialPropsLoading = createSelector(getState, state => state.selectInitialPropsLoading)
