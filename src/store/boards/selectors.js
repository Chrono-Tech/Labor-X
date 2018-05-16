import { createSelector } from 'reselect'

export const boardsSelector = () => (state) => state.boards

export const boardsListSelector = () => createSelector(
  boardsSelector(),
  (boards) => boards.list
)

export const boardByIdSelector = (id) => createSelector(
  boardsSelector(),
  (boards) => boards.byKey[`board-${id}`]
)
