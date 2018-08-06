import bip39 from 'bip39'
import hdkey from 'ethereumjs-wallet/hdkey'

const mnemonicToWallet = (web3, mnemonic) => {
  const seed = bip39.mnemonicToSeed(mnemonic)
  const hdWallet = hdkey.fromMasterSeed(seed).derivePath("m/44'/60'/0'/0/0'").getWallet()
  const privateKey = `0x${ hdWallet.getPrivateKey().toString('hex') }`
  const account = web3.eth.accounts.privateKeyToAccount(privateKey)
  web3.eth.accounts.wallet.clear()
  const web3Wallet = web3.eth.accounts.wallet.create()
  web3Wallet.add(account)
  return web3Wallet
}

export default mnemonicToWallet
