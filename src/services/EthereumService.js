import Web3 from 'web3'
import TestPRCNode from './TestPRCNode'
import bip39 from "bip39";

class EthereumService {
  constructor (node) {
    this.node = node
    this.reset()
    this.address = null
  }

  start () {
    if (this.started) {
      return
    }
    this.started = true

    switch (this.node.getProtocol()) {
      case 'http':
      case 'https':
        this.provider = new Web3.providers.HttpProvider(this.node.getURL())
        break
      case 'ws':
        // TODO @dkchv: implement it
        break
    }
    this.web3.setProvider(this.provider)
  }

  reset () {
    // TODO @dkchv: update it
    this.provider = null
    this.address = null
    this.web3 = new Web3()
    this.started = false
  }

  createAddressFromPrivateKey (privateKey) {
    if (!this.started) {
      throw new Error('Ethereum service not started')
    }
    const { address } = this.web3.eth.accounts.privateKeyToAccount(privateKey)
    this.address = address
    return address
  }

  createAddressFromMnemonic (mnemonic) {
    return this.createAddressFromPrivateKey(`0x${bip39.mnemonicToSeedHex(mnemonic)}`)
  }

  createAddressFromWallet (wallet) {

  }
}

export default new EthereumService(new TestPRCNode())
