export const POCKET_BALANCE_LOADED = 'balances/loaded'
export const POCKET_BALANCE_LOADING = 'balances/loading'
export const BALANCES_RESET = 'balances/reset'

export const updateBalance = ({ pocket }) => async (dispatch/*, getState*/) => {
  dispatch({
    type: POCKET_BALANCE_LOADING,
    pocket,
  })
  const balance = await pocket.token.dao.getBalance(pocket.address)
  dispatch({
    type: POCKET_BALANCE_LOADED,
    pocket,
    balance,
  })
}

export const subscribePocket = ({ pocket }) => async (dispatch/*, getState*/) => {
  const listener = function (data) {
    if (data.from.toLowerCase() === pocket.address.toLowerCase() || data.to.toLowerCase() === pocket.address.toLowerCase()) {
      dispatch(updateBalance({ pocket }))
    }
  }
  pocket.token.dao.on('transfer', listener)
  pocket.token.dao.on('deposit', listener)
  pocket.token.dao.on('withdrawal', listener)
  dispatch(updateBalance({ pocket }))
  return listener
}

export const unsubscribePocket = ({ pocket, listener }) => async (/*dispatch, getState*/) => {
  pocket.token.dao.removeListener('transfer', listener)
  pocket.token.dao.removeListener('deposit', listener)
  pocket.token.dao.removeListener('withdrawal', listener)
}
