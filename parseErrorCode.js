const fs = require('fs')
const jsSha3 = require('js-sha3')
const web3EthAbi = require('web3-eth-abi')

const abi = JSON.parse(fs.readFileSync('./node_modules/@laborx/sc-abi/build/contracts/JobController.json', 'utf8'))

const abiEvents = abi.abi.filter(x => x.type === 'event')

const event = 'ErrorCode'
const data = "0x00000000000000000000000000000000000000000000000000000000000032ca"

const eventAbi = abiEvents.filter(x => x.name === event)[0]

console.log(eventAbi.inputs.map(x => ({ label: x.name, value: web3EthAbi.decodeParameter(x.type, data) })))