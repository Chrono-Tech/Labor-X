import { createSelector } from 'reselect'
import { BalanceModel } from 'src/models'

export const balancesSelector = () => (state) => state.balances

export const balanceByPocket = (pocket) => createSelector(
  balancesSelector(),
  (balances) => balances.table[pocket.key] || new BalanceModel({ pocket })
)
