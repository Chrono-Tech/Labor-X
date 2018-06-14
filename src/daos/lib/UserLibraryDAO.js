import BigNumber from 'bignumber.js'
import AbstractContractDAO from './AbstractContractDAO'

export default class UserLibraryDAO extends AbstractContractDAO {
  constructor ({ address, history, abi }) {
    super({ address, history, abi })
  }

  async connect (web3, options) {
    if (this.isConnected) {
      this.disconnect()
    }
    // eslint-disable-next-line no-console
    console.log('[UserLibraryDAO] Connect')
    this.contract = new web3.eth.Contract(this.abi.abi, this.address, options)
    this.history = this.history != null // nil check
      ? new web3.eth.Contract(this.abi.abi, this.history, options)
      : this.contract
  }

  disconnect () {
    if (this.isConnected) {
      this.contract = null
      this.history = null
    }
  }

  get isConnected () {
    return this.contract != null // nil check
  }

  createSetSkillsTx (sender: String, user: String, area: BigNumber, category: BigNumber, skills: BigNumber) {
    const data = this.contract.methods.setSkills(user, area, category, skills).encodeABI()
    return {
      from: sender,
      to: this.address,
      data,
    }
  }
}
