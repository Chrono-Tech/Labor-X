import { createSelector } from 'reselect'
import BigNumber from 'bignumber.js'

import { BalanceModel, CurrencyModel } from 'src/models'

export const balancesSelector = () => (state) => state.balances

export const balanceByPocket = (pocket) => createSelector(
  balancesSelector(),
  (balances) => balances.table[pocket.key] || new BalanceModel({ pocket })
)

export const currencySelector = (currency) => createSelector(
  () => {
    return [
      new CurrencyModel({ name: 'lhr', value: new BigNumber(25) })
    ]
  },
  (currencyList) => currencyList.find((item) => item.name === currency)
)
