import log from 'loglevel'
import IPFS from 'ipfs-daemon/src/ipfs-browser-daemon';
import OrbitDB from 'orbit-db';
import Config from '../../config';

const Store = require('idb-pull-blob-store')
const IPFSRepo = require('ipfs-repo')

/**
 * Configure IPFS node
 */
export const setupNode = () => {
  return (dispatch, getState) => {
    log.info('Starting IPFS daemon');

    const ipfs = new IPFS({
      SignalServer: 'star-signal.cloud.ipfs.team', // IPFS dev server
    });

    ipfs.on('ready', () => {
      log.info(`IPFS Ready. PeerId ${ipfs.PeerId} GatewayAddress ${ipfs.GatewayAddress}`);

      const orbitdb = new OrbitDB(ipfs);
      const db = orbitdb.eventlog(Config.OrbitDbEventLog);

      db.events.on('ready', (dbname) => {
        log.info(`OrbitDb Ready [${dbname}].`)
      });

      db.events.on('error', (e) => {
        log.error('OrbitDb Error.' + e)
      })

      db.events.on('write', (dbname, hash, entry) => {
       log.debug(`OrbitDb write: [${dbname}, ${hash}, ${JSON.stringify(entry)}]`)
      })

      db.events.on('load.progress', (dbname) => {
        log.debug(`OrbitDb load.progress: [${dbname}]`)
      })

      db.events.on('synced', () => {
        log.debug('OrbitDb synced')
      })

      db.events.on('synced', () => {
        log.debug('OrbitDb sync')
      })

      db.load(100);

      dispatch({
        type: 'IPFS/SETUP_NODE',
        daemon: ipfs,
        orbitdb: orbitdb,
        db: db
      });
    })

    ipfs.on('error', (err) => {
      log.error('IPFS: ' + err)
    });
  }
}
