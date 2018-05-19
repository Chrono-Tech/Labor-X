import { daoByType } from '../daos/selectors'
import { signerSelector } from '../wallet/selectors'

export const BOARDS_CLEAR = 'boards/clear'
export const BOARDS_SAVE = 'boards/save'
export const BOARDS_FILTER = 'boards/filter'

export const initBoards = () => async (dispatch, getState) => {
  const state = getState()
  const boardControlerDAO = daoByType('BoardController')(state)
  const signer = signerSelector()(state)
  dispatch({
    type: BOARDS_CLEAR,
  })
  if (signer) {
    const boards = await boardControlerDAO.getBoards(signer.address)
    for (const board of boards) {
      dispatch({
        type: BOARDS_SAVE,
        board,
      })
    }
  }
}

export const updateFilterBoards = (filterFields) => (dispatch, getState) => {
  const state = getState()
  console.log('updateFilter', filterFields)

  const { list } = state.boards

  let { rating, categories, level, searchText } = filterFields
  let currentList = [...list] || []

  if (categories) {
    categories = Object.keys(categories).filter((item) => !!categories[item])

    currentList = currentList.filter(
      (board) => categories.every(
        (item) => board.categories.find(
          (tag) => String(tag.name).toLowerCase() === String(item).toLowerCase()
        )
      )
    )
  }

  if (level && !isNaN(parseInt(level))) {
    level = parseInt(level)

    currentList = currentList.filter((board) => board.validationLevel >= level)
  }

  if (rating && !isNaN(parseInt(rating))) {
    rating = parseInt(rating)

    currentList = currentList.filter((board) => board.rating >= rating)
  }

  if (searchText){
    searchText = String(searchText).toLowerCase()
    currentList = currentList.filter((board) => String(board.name).toLowerCase().includes(searchText) )
  }

  dispatch({
    type: BOARDS_FILTER,
    boardsList: currentList,
  })

}
