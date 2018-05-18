import { JOBS_CLEAR, JOBS_SAVE } from './actions'

export const initialState = {
  list: [],
  byKey: {},
}

const mutations = {
  [JOBS_CLEAR] () {
    return initialState
  },
  [JOBS_SAVE] (state, { job }) {
    const index = (job.key in state.byKey)
      ? state.jobs.findIndex(b => b.key === job.key)
      : -1
    const byKey = {
      ...state.byKey,
      [job.key]: job,
    }
    const list = index >= 0
      ? state.list.map(b => b.key !== job.key ? b : job)
      : [...state.list, job]
    return {
      byKey,
      list,
    }
  },
}

export default (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
