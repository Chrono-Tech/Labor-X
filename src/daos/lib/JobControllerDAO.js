import BigNumber from 'bignumber.js'
import {
  JobPostedEvent,
} from 'src/models'
import {
  ipfsHashToBytes32,
} from 'src/utils'
import AbstractContractDAO from './AbstractContractDAO'

export default class JobControllerDAO extends AbstractContractDAO {
  constructor ({ address, history, abi }) {
    super({ address, history, abi })
  }

  async connect (web3, options) {
    if (this.isConnected) {
      this.disconnect()
    }
    // eslint-disable-next-line no-console
    console.log('[JobControllerDAO] Connect')
    this.contract = new web3.eth.Contract(this.abi.abi, this.address, options)
    this.history = this.history != null // nil check
      ? new web3.eth.Contract(this.abi.abi, this.history, options)
      : this.contract

    this.jobPostedEmitter = this.history.events.JobPosted({})
      .on('data', this.handleJobPostedData.bind(this))
      .on('error', this.handleError.bind(this))
    // this.jobClosedEmitter = this.contract.events.JobClosed({})
    //   .on('data', this.handleJobClosedData.bind(this))
    //   .on('error', this.handleError.bind(this))

    return this.token
  }

  disconnect () {
    if (this.isConnected) {
      this.jobCreatedEmitter.removeAllListeners()
      this.jobClosedEmitter.removeAllListeners()
      this.jobCreatedEmitter = null
      this.jobClosedEmitter = null
      this.contract = null
      this.history = null
    }
  }

  get isConnected () {
    return this.contract != null // nil check
  }

  createPostJobTx (sender: String, flowType: Number, area: Number, category: Number, skills: Number, defaultPay: Number, detailsIPFSHash: String) {
    const data = this.contract.methods.postJob(flowType, area, category, skills, defaultPay, ipfsHashToBytes32(detailsIPFSHash)).encodeABI()
    return {
      from: sender,
      to: this.address,
      data,
    }
  }

  createPostJobOfferTx (sender: String, jobId: Number, rate: BigNumber, estimate: BigNumber, ontop: BigNumber) {
    const data = this.contract.methods.postJobOffer(jobId, rate, estimate, ontop).encodeABI()
    return {
      from: sender,
      to: this.address,
      data,
    }
  }

  handleJobPostedData (data) {
    // eslint-disable-next-line no-console
    console.log('[JobControllerDAO] JobPosted', data)
    const { returnValues } = data
    setImmediate(() => {
      this.emit('JobPosted', {
        data,
        event: new JobPostedEvent({
          key: `${data.transactionHash}/${data.logIndex}`,
          self: returnValues.self,
          jobId: Number(returnValues.jobId),
          client: returnValues.client,
          skills: Number(returnValues.skills), // bit-mask,
          skillsArea: Number(returnValues.skillsArea),
          skillsCategory: Number(returnValues.skillsCategory),
          detailsIPFSHash: returnValues.detailsIPFSHash,
          bindStatus: returnValues.bindStatus,
        }),
      })
    })
  }

  handleError (error) {
    // eslint-disable-next-line no-console
    console.error('[JobControllerDAO] Error in subscription', error)
  }
}
