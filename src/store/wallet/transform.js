import { WalletModel, WalletEntryModel } from 'src/models'
import { createTransform } from 'redux-persist'

// eslint-disable-next-line
export const decryptedWalletTransform = ({ web3 }) => createTransform(
  (inboundState) => {
    const decryptedWallet = inboundState
    if (process.env.NODE_ENV === 'development') {
      const ghost = decryptedWallet == null // nil check
        ? null
        : new WalletEntryModel({
          key: decryptedWallet.entry.key,
          name: decryptedWallet.entry.name,
          encrypted: decryptedWallet.wallet.encrypt(decryptedWallet.entry.key),
        })
      try {
        return ghost
      } catch (e) {
        // eslint-disable-next-line
        console.log('JSON.stringify error', e)
      }
      return null
    }
    return null
  },
  (outboundState, key, fullState) => {
    // eslint-disable-next-line
    console.log('Decrypt', process.env.NODE_ENV, outboundState, key, fullState)
    if (process.env.NODE_ENV === 'development') {
      const decryptedWallet = outboundState
      if (decryptedWallet) {
        const entry = new WalletEntryModel(decryptedWallet)
        // eslint-disable-next-line
        console.log('Decrypt')
        return new WalletModel({
          entry,
          wallet: web3.eth.accounts.wallet.decrypt(entry.encrypted, entry.key),
        })
      }
    }
    return null
  },
  // define which reducers this transform gets called for.
  { whitelist: ['decryptedWallet'] }
)
