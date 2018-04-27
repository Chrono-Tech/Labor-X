import { privateKey } from 'models/validator'
import ethereumService from 'services/EthereumService'
// import Web3 from 'src/network/Web3Provider'
import {toBuffer, isValidPrivate} from 'ethereumjs-util'
import wallet from 'ethereumjs-wallet'

export default (values) => {

  const pk = values.key ? values.key.trim() : ''
  // let web3 = Web3.getWeb3()
  let pkError
  try {
    ethereumService.createAddressFromPrivateKey(pk)
  } catch (e) {
    pkError = e.message
  }
  //
  return {
    key: pk && !pkError ? null : pkError,
  }
}

