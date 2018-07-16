import AbstractContractDAO from './AbstractContractDAO'

export default class PaymentGatewayDAO extends AbstractContractDAO {
  constructor({address, history, abi}) {
    super({address, history, abi})
  }

  async connect(web3, options) {
    if (this.isConnected) {
      this.disconnect()
    }
    // eslint-disable-next-line no-console
    console.log('[PaymentGatewayDAO] Connect')
    this.contract = new web3.eth.Contract(this.abi.abi, this.address, options)
    this.history = this.history != null // nil check
      ? new web3.eth.Contract(this.abi.abi, this.history, options)
      : this.contract

    return this.token
  }

  disconnect() {
    if (this.isConnected) {
      this.contract = null
      this.history = null
    }
  }

  get isConnected() {
    return this.contract != null // nil check
  }

  getBalance (address) {
    return this.contract.methods.getBalance(address).call()
  }

  createWithdrawTx(address: string, value: number) {
    const data = this.contract.methods.withdraw(value).encodeABI()
    return {
      from: address,
      to: this.address,
      data,
    }
  }

}
