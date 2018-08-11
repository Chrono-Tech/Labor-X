import { createSelector } from "reselect"

export const getState = state => state.applicationsAndOffers
export const getSelectInitialPropsLoading = createSelector(getState, state => state.selectInitialPropsLoading)
export const getCards = createSelector(getState, state => state.cards)
export const getCardsApproved = createSelector(getState, state => state.cardsApproved)
export const getApplicationsCount = createSelector(getState, state => (state.cardsApproved.length + state.cardsApproved.length))
