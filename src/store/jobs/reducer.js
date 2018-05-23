import { JOBS_CLEAR, JOBS_SAVE } from './actions'

export const initialState = {
  list: [],
  byKey: {},
}

const mutations = {
  [JOBS_CLEAR] () {
    return initialState
  },
  [JOBS_SAVE] (state, { jobs }) {
    const newJobsByKey = jobs.reduce((x, job) => {
      x[job.key] = job
      return x
    }, {})
    const byKey = { ...state.byKey, ...newJobsByKey }
    const list = Object.values(byKey)
    return { byKey, list }
  },
}

export default (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
