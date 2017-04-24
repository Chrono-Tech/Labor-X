import log from 'loglevel'
import {IpfsAdapter} from '../../lib/ipfsAdapter';

const ipfsAPI = require('ipfs-api')


import Config from '../../config'

/**
 * Configure IPFS node
 */
export const setupNode = () => {
  return (dispatch, getState) => {
    log.info('Creating IPFS client')

    const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})
    const adapter = new IpfsAdapter(ipfs);

    dispatch({
      type: 'IPFS/SETUP_NODE',
      client: adapter,
    })
  }
}
