import { OFFERS_CLEAR, OFFERS_SAVE } from './actions'

export const initialState = {
  byJobKey: {},
}

const mutations = {
  [OFFERS_CLEAR] () {
    return initialState
  },
  [OFFERS_SAVE] (state, { jobId, offers }) {
    return {
      ...state,
      byJobKey: {
        ...state.byJobKey,
        [`job-${jobId}`]: offers,
      },
    }
  },
}

export default (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
