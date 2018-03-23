import web3Provider from 'src/network/Web3Provider'
import truffleContract from 'truffle-contract'
import { UserFactoryAbi } from './abi'

export default class UserDAO {
  constructor (json = UserFactoryAbi, at = null, eventsJSON = null) {
    this._json = json
    this._at = at
    this._eventsJSON = eventsJSON || json
    this._eventsContract = null
    this.contract = null
  }

  async init () {
    this.contract = await this._initContract()
  }

  async _initContract () {
    // if (this._at !== null && validator.address(this._at) !== null) {
    //   throw new Error(`invalid address passed: ${this._at}`)
    // }
    const web3 = web3Provider.getWeb3()

    const contract = truffleContract(this._json)
    // noinspection JSUnresolvedFunction
    contract.setProvider(web3.currentProvider)
    // noinspection JSUnresolvedFunction
    await contract.detectNetwork()
    contract.address = this._at || contract.address
    // noinspection JSUnresolvedFunction
    const deployed = await contract.deployed()

    this._at = deployed.address
    if (this._eventsJSON && !this._eventsContract && this._eventsJSON !== this._json) {
      let eventsAddress
      // const key = web3.sha3(this._eventsJSON)
      // if (AbstractContractDAO._eventsContracts.hasOwnProperty(key)) {
      // eventsAddress = AbstractContractDAO._eventsContracts[ key ]
      // } else {
      const events = truffleContract(this._eventsJSON)
      // noinspection JSUnresolvedFunction
      events.setProvider(web3.currentProvider)
      // noinspection JSUnresolvedFunction
      const deployedEvents = await events.deployed()
      eventsAddress = deployedEvents.address
      // AbstractContractDAO._eventsContracts[ key ] = eventsAddress
      // }

      const eventsContract = truffleContract(this._json)
      // noinspection JSUnresolvedFunction
      eventsContract.setProvider(web3.currentProvider)
      // noinspection JSUnresolvedFunction
      await eventsContract.detectNetwork()
      eventsContract.address = eventsAddress

      // noinspection JSUnresolvedFunction
      this._eventsContract = eventsContract.deployed()
    }

    this._eventsContract = this._eventsContract || Promise.resolve(deployed)
    return deployed
  }
}

// export default new UserDAO(UserFactoryAbi)
