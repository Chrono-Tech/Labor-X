import AbstractContractDAO from './AbstractContractDAO'

export default class ERC20LibraryDAO extends AbstractContractDAO {
  constructor (address, abi) {
    super(address, abi)
  }

  async getContracts () {
    return this.contract.methods.getContracts().call()
  }
}
