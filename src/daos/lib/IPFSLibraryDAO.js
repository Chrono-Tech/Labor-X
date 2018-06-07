import web3 from 'web3'
import AbstractContractDAO from './AbstractContractDAO'
import HashSetEvent from "../../models/app/HashSetEvent";
import {ipfsHashToBytes32} from "../../utils";

export default class IPFSLibraryDAO extends AbstractContractDAO {
  constructor ({ address, history, abi }) {
    super({ address, history, abi })
  }

  async connect (web3, options) {
    if (this.isConnected) {
      this.disconnect()
    }
    // eslint-disable-next-line no-console
    console.log(`[${this.constructor.name}] Connect`)
    this.contract = new web3.eth.Contract(this.abi.abi, this.address, options)
    this.history = this.history != null // nil check
      ? new web3.eth.Contract(this.abi.abi, this.history, options)
      : this.contract

    this.hashSetEmitter = this.history.events.HashSet({})
      .on('data', this.handleHashSetData.bind(this))
      .on('error', this.handleError.bind(this))

    return this.token
  }

  disconnect () {
    if (this.isConnected) {
      this.contract = null
      this.history = null
      this.hashSetEmitter.removeAllListeners()
      this.hashSetEmitter = null
    }
  }

  get isConnected () {
    return this.contract != null // nil check
  }

  async getHash (from, itemName) {
    const itemNameInBytes32 = web3.utils.asciiToHex(itemName)
    const hash = await this.contract.methods.getHash(from, itemNameInBytes32).call()
    return hash
  }

  createSetHashTx (from, itemName, itemHash) {
    const itemNameInBytes32 = web3.utils.asciiToHex(itemName)
    const itemHashInBytes32 = ipfsHashToBytes32(itemHash)
    const data = this.contract.methods.setHash(itemNameInBytes32, itemHashInBytes32).encodeABI()
    return {
      from,
      to: this.address,
      data,
    }
  }

  handleHashSetData (data) {
    // eslint-disable-next-line no-console
    console.log('[IPFSLibraryDAO] HashSet', data)
    const { returnValues } = data
    setImmediate(() => {
      this.emit('HashSet', {
        data,
        event: new HashSetEvent({
          key: `${data.transactionHash}/${data.logIndex}`,
          self: returnValues.self,
          from: returnValues.from,
          itemName: returnValues.itemName,
          itemHash: returnValues.itemHash,
        }),
      })
    })
  }

  handleError (error) {
    // eslint-disable-next-line no-console
    console.error('[IPFSLibraryDAO] Error in subscription', error)
  }

}
