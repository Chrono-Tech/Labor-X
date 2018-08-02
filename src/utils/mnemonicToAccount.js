import bip39 from 'bip39'
import hdkey from 'ethereumjs-wallet/hdkey'

const mnemonicToAccount = (web3, mnemonic) => {
  const seed = bip39.mnemonicToSeed(mnemonic)
  const hdWallet = hdkey.fromMasterSeed(seed)
  const wallet = hdWallet.derivePath("m/44'/60'/0'/0/0'").getWallet()
  const privateKey = `0x${ wallet.getPrivateKey().toString('hex') }`
  const account = web3.eth.accounts.privateKeyToAccount(privateKey)
  return account
}

export default mnemonicToAccount