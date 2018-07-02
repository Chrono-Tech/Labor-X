import AbstractContractDAO from './AbstractContractDAO'

export default class UserLibraryDAO extends AbstractContractDAO {

  constructor ({ address, history, abi }) {
    super({ address, history, abi })
  }

}
