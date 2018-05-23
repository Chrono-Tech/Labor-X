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
  [BOARDS_SAVE] (state, { boards }) {
    const newBoardsByKey = boards.reduce((x, board) => {
      x[board.key] = board
      return x
    }, {})
    const byKey = { ...state.byKey, ...newBoardsByKey }
    const list = Object.values(byKey)
    return { byKey, list, filtered: list }
  },
  [BOARDS_FILTER] (state, { boardsList }) {

    return {
      ...state,
      filtered: boardsList,
    }
  },
}

export default (state = initialState, { type, ...other }) => {
  return (type in mutations)
    ? mutations[type](state, other)
    : state
}
