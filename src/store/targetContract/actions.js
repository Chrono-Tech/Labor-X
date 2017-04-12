import * as txActions from '../transaction/transactionActions'

export const method = () => {
  return (dispatch) => {
    dispatch(txActions.txPublished());

    setTimeout(() => {
      dispatch(txActions.txMined());
    }, 5000)
  }
}