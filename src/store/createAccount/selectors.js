import { createSelector } from 'reselect'
import { DEFAULT_ACCOUNT_PREFFIX } from "./actions";
import { walletsSelector } from "../";

export const getState = state => state.createAccount

export const getExistingAccount = createSelector(getState, state => state.existingAccount)

export const generateNameWalletSelector = () => createSelector(
  walletsSelector(),
  (wallet) => {
    const generatedWallets = wallet.walletsList.filter(x => x.name.startsWith(DEFAULT_ACCOUNT_PREFFIX))
    const counter = generatedWallets.length
      ? Math.max(generatedWallets.map(x => parseInt(x.name.replace(DEFAULT_ACCOUNT_PREFFIX, '')))) + 1
      : 1
    return `${DEFAULT_ACCOUNT_PREFFIX} ${counter}`
  }
)