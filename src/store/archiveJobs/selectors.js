import { createSelector } from "reselect"
import moment from 'moment'
import groupBy from 'lodash/groupBy'

export const getState = state => {
    console.log(state);
    return state.archiveJobs
}

export const getSelectInitialPropsLoading = createSelector(getState, state => state.selectInitialPropsLoading)
export const getCardsByGroupDays = createSelector(
    state => state.archiveJobs.cards,
    (cards) => {
        const groups = groupBy(cards, card => moment(card.job.extra.createdAt).format('YYYY-MM-DD'));
        return Object.entries(groups)
            .map(([key, cards]) => ({
                key,
                date: cards[0].job.extra.createdAt,
                cards,
            }))
            .sort((a, b) => -moment(a.date).diff(moment(b.date)))
    }
)

export const getTotalCardsCount = createSelector(
    state => state.archiveJobs.cards,
    (cards) => cards.length,
)

export const getFinalizedCardsCount = createSelector(
    state => state.archiveJobs.cards,
    (cards) => cards.filter(card => card.worker != null).length,
)

export const getFinishedCardsCount = createSelector(
    state => state.archiveJobs.cards,
    cards => cards.length - cards.filter(card => card.worker != null).length
)