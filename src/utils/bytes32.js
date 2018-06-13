import BigNumber from 'bignumber.js'
import bs58 from 'bs58'
import Web3Utils from 'web3-utils'

const ZERO_ADDRESS = Web3Utils.padLeft('', 40)

export const ipfsHashToBytes32 = (value) => {
  return `0x${Buffer.from(bs58.decode(value)).toString('hex').substr(4)}`
}

export const bytes32ToIPFSHash = (bytes) => {
  if (/^0x0{63}[01]$/.test(`${bytes}`)) {
    return ''
  }
  const str = Buffer.from(bytes.replace(/^0x/, '1220'), 'hex')
  return bs58.encode(str)
}

export const bytes32ToNumber = (bytes, rethrow = true) => {
  try {
    return Web3Utils.toBN(bytes).toNumber()
  } catch (e) {
    if (rethrow) {
      throw e
    } else {
      // eslint-disable-next-line no-console
      console.log('[utils] bytes32ToNumber', bytes, e)
    }
  }
  return null
}
export const bytes32ToBigNumber = (bytes) => new BigNumber(Web3Utils.toBN(bytes))
export const bytes32ToAddress = (bytes, zeroIsNull = false) => {
  const res = Web3Utils.padLeft(Web3Utils.toBN(bytes).toString('hex'), 40)
  return zeroIsNull && res === ZERO_ADDRESS
    ? null
    : `0x${res}`
}
export const bytes32ToDate = (bytes, zeroIsNull = false) => {
  const res = Web3Utils.toBN(bytes).toNumber() * 1000
  return zeroIsNull && res === 0
    ? null
    : new Date(res)
}
