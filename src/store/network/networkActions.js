import Web3 from 'web3'
import log from 'loglevel'

export const setupWeb3 = (web3) => {
  return (dispatch, getState) => {
    if (typeof web3 !== 'undefined' && web3 !== null) {
      // Web3 has been injected by the browser (Mist/MetaMask)
      log.info('web3 provided by MetaMask')
      dispatch({
        type: 'NETWORK/SETUP_WEB3',
        provided: true,
        web3: new Web3(web3.currentProvider)
      })
    } else {
      const currentWeb3 = new Web3()
      const address = 'http://localhost:8545'
      currentWeb3.setProvider(new currentWeb3.providers.HttpProvider(address))
      dispatch({
        type: 'NETWORK/SETUP_WEB3',
        provided: false,
        web3: currentWeb3
      })
    }
  }
}

/**
 * Load available accounts from Web3 instance
 */
export const loadAccounts = () => {
  return (dispatch, getState) => {
    const web3 = getState().network.web3
    web3.eth.getAccounts((err, accs) => {
      if (err !== null) {
        log.error('There was an error fetching your accounts.', err)
        return
      }

      if (accs.length === 0) {
        log.error('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
        return
      }

      dispatch({
        type: 'NETWORK/SET_ACCOUNTS',
        accounts: accs
      })
    })
  }
}
