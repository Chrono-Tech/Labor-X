import AbstractContractDAO from './AbstractContractDAO'

export default class BoardControllerDAO extends AbstractContractDAO {
  constructor (address, abi) {
    super(address, abi)
  }
}
