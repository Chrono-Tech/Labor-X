import assert from 'assert'
import ipfsAPI from 'ipfs-api'
import { promisify } from 'es6-promisify'

export const DEFAULT_CONFIG = {
  host: 'api.ipfs.tp.ntr1x.com',
  port: 443,
  protocol: 'https',
}

const HOSTS = [
  'node1.ipfs.tp.ntr1x.com',
  'node2.ipfs.tp.ntr1x.com',
  'node3.ipfs.tp.ntr1x.com',
  'node4.ipfs.tp.ntr1x.com',
]

let roundRobinIndex = 0
export const configFactory = () => {
  const index = roundRobinIndex
  roundRobinIndex = (index + 1) % HOSTS.length
  return {
    host: HOSTS[index],
    port: 443,
    protocol: 'https',
  }
}

export const storeIntoIPFS = async (value, config = configFactory()) => {
  assert(value != null) // nil check
  const putData = ipfsAPI(config).object.put
  const putDataAsync = promisify(putData)
  const entry = {
    Data: Buffer.from(JSON.stringify(value)),
    Links: [],
  }
  const response = await putDataAsync(entry)
  const hash = response.toJSON().multihash
  return hash
}

export const loadFromIPFS = (hash, timeout = 20000, config = configFactory()) => {
  if (!hash) {
    return null
  }
  const getData = ipfsAPI(config).object.get
  const getDataAsync = promisify(getData)
  return new Promise(async (resolve) => {
    try {
      const response = await Promise.race([
        getDataAsync(hash),
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error('[IPFS] Request timeout'))
          }, timeout)
        }),
      ])
      const result = response.toJSON()
      resolve(JSON.parse(Buffer.from(result.data).toString()))
    } catch (e) {
      // eslint-disable-next-line
      console.warn('IPFS get error', e, 'hash', hash)
      resolve(null)
    }
  })
}
