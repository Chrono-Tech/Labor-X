const fs = require('fs')
const jsSha3 = require('js-sha3')

const abi = require('@laborx/sc-abi/build/contracts/JobController')

const abiEvents = abi.abi.filter(x => x.type === 'event')

console.log(abiEvents.map(x => `${x.name}(${x.inputs.map(x => x.type).join(',')})`).map(x => ({
	signature: x,
	hash: jsSha3.keccak_256(x)
})))

