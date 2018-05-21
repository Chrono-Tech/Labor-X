import { BalanceModel } from 'src/models'
import { POCKET_BALANCE_LOADED, POCKET_BALANCE_LOADING, BALANCES_RESET } from './actions'

export const initialState = {
  table: {},
}

const mutations = {
  [POCKET_BALANCE_LOADED] (state, { pocket, balance }) {
    const model = state.table[pocket.key] || new BalanceModel({ pocket })
    return {
      ...state,
      table: {
        ...state.table,
        [pocket.key]: model.loaded(balance),
      },
    }
  },
  [POCKET_BALANCE_LOADING] (state, { pocket }) {
    const model = state.table[pocket.key] || new BalanceModel({ pocket })
    return {
      ...state,
      table: {
        ...state.table,
        [pocket.key]: model.loading(),
      },
    }
  },
  [BALANCES_RESET]: (state) => {
    state.table = {}
  },
}

export default (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
