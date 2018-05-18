import assert from 'assert'
import ipfsAPI from 'ipfs-api'
import { promisify } from 'es6-promisify'

const DEFAULT_CONFIG = {
  host: 'ipfs.chronobank.io',
  port: 80,
  protocol: 'http',
}

export const storeIntoIPFS = async (value, config = DEFAULT_CONFIG) => {
  assert(value != null) // nil check
  const putData = ipfsAPI(config).object.put
  console.log('putData', putData)
  const putDataAsync = promisify(putData)
  console.log('putDataAsync', putDataAsync)
  const entry = {
    Data: Buffer.from(JSON.stringify(value)),
    Links: [],
  }
  // const response = await putDataAsync(entry)
  // const hash = response.toJSON().multihash
  // return hash
  return 'QmajWTti6H2gX9LS2aMi2tc5NQdtB3vy'
}

export const loadFromIPFS = (hash, timeout = 5000, config = DEFAULT_CONFIG) => {
  if (!hash) {
    return null
  }
  const getData = ipfsAPI(config).object.get
  console.log('getData', getData)
  const getDataAsync = promisify(getData)
  console.log('getDataPromise', getDataAsync)

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
