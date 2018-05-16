import AbstractContractDAO from './AbstractContractDAO'

export default class JobControllerDAO extends AbstractContractDAO {
  constructor (address, abi) {
    super(address, abi)
  }
}
