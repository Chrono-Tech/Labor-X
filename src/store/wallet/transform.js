// @flow

import { WalletModel, WalletEntryModel } from 'src/models'
import { createTransform } from 'redux-persist'

export const decryptedWalletTransform = ({ web3 }) => createTransform(
  (state: WalletModel) => {
    if (state) {
      return new WalletEntryModel({
        key: state.entry.key,
        name: state.entry.name,
        encrypted: state.wallet.encrypt(state.entry.key),
      })
    } else {
      return null
    }
  },
  (state: WalletEntryModel) => {
    if (state) {
      const walletEntryModel = new WalletEntryModel(state)
      return new WalletModel({
        entry: walletEntryModel,
        wallet: web3.eth.accounts.wallet.decrypt(walletEntryModel.encrypted, walletEntryModel.key),
      })
    } else {
      return null
    }
  },
  { whitelist: ['decryptedWallet'] }
)
