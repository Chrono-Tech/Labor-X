import { createSelector } from "reselect"
import {JOB_STATE_PENDING_FINISH} from "../../models";

export const getState = state => state.activeJobs
export const getSelectInitialPropsLoading = createSelector(getState, state => state.selectInitialPropsLoading)
export const getCards = createSelector(getState, state => state.cards)
export const getToPayCards = createSelector(getCards, (cards) => cards.filter((x) => x.job.state === JOB_STATE_PENDING_FINISH))
export const getOtherCards = createSelector(getCards, (cards) => cards.filter((x) => x.job.state !== JOB_STATE_PENDING_FINISH))
export const getLhtUsdPrice = createSelector(getState, state => state.lhtUsdPrice)