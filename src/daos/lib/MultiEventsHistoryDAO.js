import AbstractContractDAO from './AbstractContractDAO'

export default class MultiEventHistoryDAO extends AbstractContractDAO {
  constructor ({ address, abi }) {
    super({ address, abi })
  }

  async connect (Web3, options) {
    if (this.isConnected) {
      this.disconnect()
    }
    // eslint-disable-next-line no-console
    console.log('[MultiEventHistoryDAO] Connect')
    this.contract = new Web3.eth.Contract(this.abi.abi, this.address, options)
  }

  disconnect () {
    if (this.isConnected) {
      this.contract = null
    }
  }

  get isConnected () {
    return this.contract != null // nil check
  }
}
