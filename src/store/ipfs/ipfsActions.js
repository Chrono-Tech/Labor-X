import log from 'loglevel';
import IPFS from 'ipfs';
import IPFSRepo from 'ipfs-repo';
import idbBS from 'idb-pull-blob-store';

/**
 * Configure IPFS node
 */
export const setupNode = () => {
    return (dispatch, getState) => {
        const repo = new IPFSRepo('LaborX', {stores: idbBS});
        const node = new IPFS({
            start: false,
            repo: repo
        });

        dispatch({
            type: 'IPFS/SETUP_NODE',
            node: node
        });
        dispatch(runNode());
    };
};

/**
 * Run IPFS node
 */
const runNode = () => {
    return (dispatch, getState) => {
        const node = getState().ipfs.node;
        node.load(err => {
            if (err) {
                log.error(err);
            } else {
                node.goOnline(err => {
                    if (err) {
                        log.error(err);
                    } else {
                        log.info("IPFS node is online");
                    }
                });

                node.id((err, res) => {
                    if (err) {
                        throw err
                    }

                    log.info('IPFS', {
                        id: res.id, version: res.agentVersion, protocol_version: res.protocolVersion
                    });
                })
            }
        });
    };
};
