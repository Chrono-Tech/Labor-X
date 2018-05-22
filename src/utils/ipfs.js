import assert from 'assert'
import ipfsAPI from 'ipfs-api'
import { promisify } from 'es6-promisify'

const DEFAULT_CONFIG = {
  host: 'api.ipfs.tp.ntr1x.com',
  port: 80,
  protocol: 'http',
}

export const storeIntoIPFS = async (value, config = DEFAULT_CONFIG) => {
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

export const loadFromIPFS = (hash, timeout = 20000, config = DEFAULT_CONFIG) => {
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
