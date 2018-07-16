const fs = require('fs');
const jsSha3 = require('js-sha3');

const NETWORK_ID = '88'

const contractAbiList = fs.readdirSync(`${__dirname}/../node_modules/@laborx/sc-abi/build/contracts`).map(x => require(`@laborx/sc-abi/build/contracts/${x}`))

const scConfig = contractAbiList.filter(abi => abi.networks[NETWORK_ID]).reduce((result, contractAbi) => {

  const contract = {
    name: contractAbi.contractName,
    addr: contractAbi.networks[NETWORK_ID].address,
  }

  const events = contractAbi.abi.filter(x => x.type === 'event').reduce((result, eventAbi) => {

    const sign = `${ eventAbi.name }(${ eventAbi.inputs.map(x => x.type).join(',') })`

    const event = {
      name: eventAbi.name,
      sign,
      hash: `0x${ jsSha3.keccak_256(sign) }`
    }

    result[ event.name ] = event
    result[ event.hash ] = event

    return result

  }, {})

  contract.events = events

  result[ contract.name ] = contract
  result[ contract.addr ] = contract

  return result

}, {})

fs.writeFileSync(`${ __dirname }/../config/sc-config.json`, JSON.stringify(scConfig, null, '\t'), 'utf8');


// interface Event {
//   name: string;
//   sign: string;
//   hash: string;
// }
//
// interface Contract {
//   name: string;
//   addr: string;
//   events: {
//     [ hash: string ]: Event,
//     [ name: string ]: Event,
//   }
// }
//
// interface ScConfig {
//   [ contractName: string ]: Contract;
//   [ contractAddr: string ]: Contract;
// }