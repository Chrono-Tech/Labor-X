import { BOARDS_CLEAR, BOARDS_SAVE } from './actions'

export const initialState = {
  list: [],
  byKey: {},
}

const mutations = {
  [BOARDS_CLEAR] () {
    return initialState
  },
  [BOARDS_SAVE] (state, { board }) {
    const index = (board.key in state.byKey)
      ? state.boards.findIndex(b => b.key === board.key)
      : -1
    const byKey = {
      ...state.byKey,
      [board.key]: board,
    }
    const list = index >= 0
      ? state.list.map(b => b.key !== board.key ? b : board)
      : [...state.list, board]
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
