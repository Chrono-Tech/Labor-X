import Web3 from 'web3'

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://parity.tp.ntr1x.com:8546'))

export default web3