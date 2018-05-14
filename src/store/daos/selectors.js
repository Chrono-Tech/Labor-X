import { createSelector } from 'reselect'

export const daosSelector = () => (state) => state.daos

export const daoByAddress = (address) => createSelector(
  daosSelector(),
  (daos) => (address in daos.byAddress)
    ? daos.byAddress[address].value
    : null
)

export const daoByName = (name) => createSelector(
  daosSelector(),
  (daos) => (name in daos.byName)
    ? daos.byName[name].value
    : null
)
