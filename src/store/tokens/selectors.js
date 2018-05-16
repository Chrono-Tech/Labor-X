import { createSelector } from 'reselect'

export const tokensSelector = () => (state) => state.tokens

export const tokenByAddress = (address) => createSelector(
  tokensSelector(),
  (tokens) => (address in tokens.byAddress)
    ? tokens.byAddress[address]
    : null
)

export const tokenByKey = (key) => createSelector(
  tokensSelector(),
  (tokens) => (key in tokens.byKey)
    ? tokens.byKey[key]
    : null
)
