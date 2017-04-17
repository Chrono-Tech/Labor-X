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

    // //-----
    // setInterval(() => {
    //   _updateSwarmPeers(ipfs._daemon)
    //     .then((peers) => {
    //       console.log(peers);
    //       // this._peers = peers || []
    //       // // TODO: get unique (new) peers and emit 'peer' for each instead of all at once
    //       // this.events.emit('peers', this._peers)
    //     })
    //     .catch((e) => console.error(e))
    // }, 3000)
    // // ----


    // A hack to force peers to connect
    ipfs._daemon.object.put(new Buffer(JSON.stringify({ app: 'orbit.chat' })))
      .then((res) => {
        log.info('Hack: ' + res)
        ipfs._daemon.object.get(res.toJSON().multihash, { enc: 'base58' })
    })
    .catch((err) => log.error(err))


    ipfs.on('error', (err) => {
      log.error('IPFS: ' + err)
    });
  }
}

// function _updateSwarmPeers(ipfs) {
//   return new Promise((resolve, reject) => {
//     ipfs.swarm.peers((err, res) => {
//       if (err) reject(err)
//       resolve(res)
//     })
//   })
//     .then((peers) => Object.keys(peers).map((e) => peers[e].addr.toString()))
//     .catch((e) => console.error(e))
// }