import { WalletModel, WalletEntryModel } from 'src/models'
import { createTransform } from 'redux-persist'

export const decryptedWalletTransform = ({ web3 }) => createTransform(
  (inboundState) => {
    const decryptedWallet = inboundState
    return decryptedWallet == null
      ? null
      : new WalletEntryModel({
        key: decryptedWallet.entry.key,
        name: decryptedWallet.entry.name,
        encrypted: decryptedWallet.wallet.encrypt(decryptedWallet.entry.key),
      })
  },
  (outboundState) => {
    const decryptedWallet = outboundState
    if (decryptedWallet) {
      const entry = new WalletEntryModel(decryptedWallet)
      return new WalletModel({
        entry,
        wallet: web3.eth.accounts.wallet.decrypt(entry.encrypted, entry.key),
      })
    } else {
      return null
    }
  },
  // define which reducers this transform gets called for.
  { whitelist: ['decryptedWallet'] }
)
