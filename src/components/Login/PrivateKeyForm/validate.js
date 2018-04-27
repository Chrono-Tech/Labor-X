import { privateKey } from 'models/validator'
// import Web3 from 'src/network/Web3Provider'
import {toBuffer, isValidPrivate} from 'ethereumjs-util'
import wallet from 'ethereumjs-wallet'

export default (values) => {

  const pk = values.privateKey ? values.privateKey.trim() : ''
  // let web3 = Web3.getWeb3()
  //
  return {
    privateKey: true,
  }
}

