import web3 from './web3'

import jsonInterface from '@laborx/sc-abi/build/contracts/JobController.json'

const contract = new web3.eth.Contract(jsonInterface.abi)

export const releasePayment = () => {

}