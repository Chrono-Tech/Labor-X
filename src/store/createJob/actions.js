import { signerSelector } from '../wallet/selectors'
import { daoByType } from "src/store";

export const SELECT_INITIAL_PROPS_REQUEST = 'CREATE_JOB/SELECT_INITIAL_PROPS/REQUEST'
export const SELECT_INITIAL_PROPS_SUCCESS = 'CREATE_JOB/SELECT_INITIAL_PROPS/SUCCESS'
export const SELECT_INITIAL_PROPS_FAILURE = 'CREATE_JOB/SELECT_INITIAL_PROPS/FAILURE'
export const selectInitialPropsRequest = (req) => ({ type: SELECT_INITIAL_PROPS_REQUEST, payload: req })
export const selectInitialPropsSuccess = (res) => ({ type: SELECT_INITIAL_PROPS_SUCCESS, payload: res })
export const selectInitialPropsFailure = (err) => ({ type: SELECT_INITIAL_PROPS_FAILURE, payload: err })
export const selectInitialProps = () => async (dispatch, getState) => {
  try {
    dispatch(selectInitialPropsRequest())
    const state = getState()
    const BoardController = daoByType('BoardController')(state)
    const signer = signerSelector()(state)
    const myConnectedBoards = await BoardController.getBoardsForUser(signer.address)

    dispatch(selectInitialPropsSuccess({ myConnectedBoards }))
  } catch (err) {
    dispatch(selectInitialPropsFailure(err))
  }
}
