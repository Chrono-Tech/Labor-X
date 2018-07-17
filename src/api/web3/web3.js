import web3 from 'web3'

const API_URL = 'wss://parity.tp.ntr1x.com:8546'

const provider = new web3.providers.WebsocketProvider(API_URL)

export default new web3(provider)