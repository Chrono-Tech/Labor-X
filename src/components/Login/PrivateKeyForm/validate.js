import { privateKey } from 'models/validator'
import Web3 from 'src/network/Web3Provider'
import {toBuffer, isValidPrivate} from 'ethereumjs-util'

export default (values) => {

  const pk = values.privateKey ? values.privateKey.trim() : ''
  let web3 = Web3.getWeb3()

  if (pk) {
    console.log('FormValidator', pk, isValidPrivate(new Buffer(pk, 'hex')))
  }
  return {
    privateKey: isValidPrivate(new Buffer(pk, 'hex')),
  }
}

