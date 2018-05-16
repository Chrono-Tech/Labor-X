import wallet from 'ethereumjs-wallet'
import Web3 from 'web3'

export const privateKey = (value) => {
  try {
    // console.log(value)
    wallet.fromPrivateKey(Buffer.from(value, 'hex'))
    return null
  } catch (e) {
    return 'validator.invalidPrivateKey'
  }
}

export const isEthereumAddress = (value) => {
  if (!value || Web3.isAddress(value)) {
    return { value: 'validator.invalidAddress', blockchain: 'Ethereum' }
  }
  return null
}

export const required = (value) => {
  return value
    ? null
    : 'validator.required'
}
