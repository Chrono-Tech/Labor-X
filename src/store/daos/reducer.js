import { DAOS_REGISTER } from './actions'

export const initialState = {
  byType: {},
  byAddress: {},
}

const mutations = {
  [DAOS_REGISTER] (state, { model }) {
    return {
      ...state,
      byType: {
        ...state.byType,
        [model.contract.type]: model,
      },
      byAddress: {
        ...state.byAddress,
        [model.address]: model,
      },
    }
  },
}

export default (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
