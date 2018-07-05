import AbstractContractDAO from './AbstractContractDAO'

export default class Roles2LibraryDAO extends AbstractContractDAO {

  constructor ({ address, history, abi }) {
    super({ address, history, abi })
  }

  getUserRoles (address) {
    return this.contract.methods.getUserRoles(address).call()
  }

}
