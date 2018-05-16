import { daoByType } from '../daos/selectors'
import { signerSelector } from '../wallet/selectors'

export const BOARDS_CLEAR = 'boards/clear'
export const BOARDS_SAVE = 'boards/save'

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
