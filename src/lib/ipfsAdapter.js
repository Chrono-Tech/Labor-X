//@flow

export class IpfsAdapter {
  constructor (ipfsApi) {
    this.api = ipfsApi
  }

  /**
   * Promisify ipfs.object.put api call
   *
   * @param obj
   * @returns {Promise}
   */
  putObj (obj): Promise {
    const json = JSON.stringify(obj)
    const data = {
      Data: new Buffer(json),
      Links: []
    }

    return new Promise((resolve, reject) => {
      this.api.object.put(data, (err, node) => {
        if (err) {
          reject(err)
        } else {
          resolve(node.toJSON().multihash)
        }
      })
    })
  }

  /**
   * Promisify ipfs.object.get api call
   *
   * @param hash
   * @returns {Promise}
   */
  getObj (hash): Promise {
    return new Promise((resolve, reject) => {
      this.api.object.get(hash, (err, response) => {
        if (err) {
          reject(err)
        } else {
          const result = response.toJSON()
          const data = JSON.parse(Buffer.from(result.data).toString())
          resolve(data)
        }
      })
    })
  }
}
