import log from 'loglevel'
import IPFS from 'ipfs-daemon/src/ipfs-browser-daemon';
import OrbitDB from 'orbit-db';
import Config from '../../config';

/**
 * Configure IPFS node
 */
export const setupNode = () => {
  return (dispatch, getState) => {
    log.info('Starting IPFS daemon');

    const ipfs = new IPFS();
    ipfs.on('ready', () => {
      log.info(`IPFS Ready. PeerId ${ipfs.PeerId}`);

      const orbitdb = new OrbitDB(ipfs);
      const db = orbitdb.eventlog(Config.OrbitDbEventLog);

      db.events.on('ready', () => {
        log.info('OrbitDb Ready.')
      });

      db.events.on('error', (e) => {
        log.error('OrbitDb Error.' + e)
      })

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
