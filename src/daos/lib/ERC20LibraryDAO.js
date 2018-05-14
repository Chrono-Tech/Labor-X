import AbstractContractDAO from './AbstractContractDAO'

export default class ERC20LibraryDAO extends AbstractContractDAO {
  constructor (address, abi) {
    super(address, abi)
  }
}
