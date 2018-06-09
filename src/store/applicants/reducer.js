import { APPLICANTS_CLEAR, APPLICANTS_SAVE } from './actions'

export const initialState = {
  byJobKey: {},
}

const mutations = {
  [APPLICANTS_CLEAR] () {
    return initialState
  },
  [APPLICANTS_SAVE] (state, { jobId, applicants }) {
    return {
      ...state,
      byJobKey: {
        ...state.byJobKey,
        [`job-${jobId}`]: applicants,
      },
    }
  },
}

export default (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
