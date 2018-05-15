import { TOKENS_REGISTER } from './actions'

export const initialState = {
  byKey: {},
  byAddress: {},
}

const mutations = {
  [TOKENS_REGISTER] (state, { model }) {
    return {
      ...state,
      byKey: {
        ...state.byKey,
        [model.token.key]: model,
      },
      byAddress: {
        ...state.byAddress,
        [model.token.address]: model,
      },
    }
  },
}

export default (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
