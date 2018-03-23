import Web3 from 'web3'

class Web3Provider {
  constructor () {
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    this.init = false
  }

  async test () {
    if (this.init) {
      return
    }
    this.init = true
    try {
      const accounts = await this.web3.eth.getAccounts()
      // console.log('--Web3Provider#test', accounts)
    } catch (e) {
      // eslint-disable-next-line
      console.error('error', e.message)
    }
  }

  getWeb3 () {
    return this.web3
  }
}

export default new Web3Provider()
