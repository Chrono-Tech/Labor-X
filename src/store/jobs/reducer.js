import {
  JOBS_CLEAR, JOBS_SAVE, JOBS_FILTER, JOBS_CLIENT_SAVE, JOBS_WORKER_SAVE,
  GET_JOBS_OFFERS_REQUEST, GET_JOBS_OFFERS_FAILURE, GET_JOBS_OFFERS_SUCCESS,
} from './actions'

export const initialState = {
  list: [],
  clientList: [],
  workerList: [],
  filtered: [],
  byKey: {},
  clientByKey: {},
  workerByKey: {},
  offers: {
    loading: false,
    offers: null,
    err: null,
  },
}

const mutations = {
  [JOBS_CLEAR] () {
    return initialState
  },
  [JOBS_SAVE] (state, jobs) {
    const newJobsByKey = jobs.jobList.reduce((x, job) => {
      x[job.key] = job
      return x
    }, {})
    const byKey = { ...state.byKey, ...newJobsByKey }
    const list = Object.values(byKey)
    return { ...state, byKey, list, filtered: list }
  },
  [JOBS_CLIENT_SAVE] (state, jobs) {
    const newJobsByKey = jobs.jobList.reduce((x, job) => {
      x[job.key] = job
      return x
    }, {})
    const byKey = { ...state.byKey, ...newJobsByKey }
    const clientByKey = { ...state.clientByKey, ...newJobsByKey }
    const list = Object.values(byKey)
    const clientList = Object.values(clientByKey)
    return { ...state, byKey, list, clientList, clientByKey }
  },
  [JOBS_WORKER_SAVE] (state, jobs) {
    const newJobsByKey = jobs.jobList.reduce((x, job) => {
      x[job.key] = job
      return x
    }, {})
    const byKey = { ...state.byKey, ...newJobsByKey }
    const workerByKey = { ...state.workerByKey, ...newJobsByKey }
    const list = Object.values(byKey)
    const workerList = Object.values(workerByKey)
    return { ...state, byKey, list, workerList, workerByKey }
  },

  [JOBS_FILTER] (state, { jobsList }) {
    return {
      ...state,
      filtered: jobsList,
    }
  },

  [GET_JOBS_OFFERS_REQUEST]: (state) => ({ ...state, offers: { ...state.offers, loading: true } }),
  [GET_JOBS_OFFERS_SUCCESS]: (state, { offers }) => ({ ...state, offers: { ...state.offers, loading: false, offers } }),
  [GET_JOBS_OFFERS_FAILURE]: (state, { err }) => ({ ...state, offers: { ...state.offers, loading: false, err } }),

}

export default (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
