import { BOARDS_CLEAR, BOARDS_SAVE, BOARDS_FILTER } from './actions'

export const initialState = {
  list: [],
  filtered: [],
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
      filtered: list,
      list,
    }
  },
  [BOARDS_FILTER] (state, { boardsList }) {

    return {
      filtered: boardsList,
    }
  },
}

export default (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
