import { currentAddressSelector } from "src/store"
import { daoByType } from "src/store";

export const SELECT_INITIAL_PROPS_REQUEST = 'JOB_BOARDS/SELECT_INITIAL_PROPS/REQUEST'
export const SELECT_INITIAL_PROPS_SUCCESS = 'JOB_BOARDS/SELECT_INITIAL_PROPS/SUCCESS'
export const SELECT_INITIAL_PROPS_FAILURE = 'JOB_BOARDS/SELECT_INITIAL_PROPS/FAILURE'
export const selectInitialPropsRequest = (req) => ({ type: SELECT_INITIAL_PROPS_REQUEST, payload: req })
export const selectInitialPropsSuccess = (res) => ({ type: SELECT_INITIAL_PROPS_SUCCESS, payload: res })
export const selectInitialPropsFailure = (err) => ({ type: SELECT_INITIAL_PROPS_FAILURE, payload: err })
export const selectInitialProps = () => async (dispatch, getState) => {
  try {
    dispatch(selectInitialPropsRequest())
    const state = getState()
    const BoardController = daoByType('BoardController')(state)
    const userAddress = currentAddressSelector()(state)
    const boards = await BoardController.getBoards(userAddress)
    const boardIds = boards.map(x => x.id)
    const boardsJobsCounters = await Promise.all(boardIds.map(id => BoardController.getJobsInBoardCount(id)))
    const cards = boards.map((board, i) => ({
      board,
      jobsCount: boardsJobsCounters[i],
      clientsCount: 0, // todo: we did not have correct method in smart contract to fetch clientsCount
    }))
    dispatch(selectInitialPropsSuccess({ cards }))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    dispatch(selectInitialPropsFailure(err))
  }
}
