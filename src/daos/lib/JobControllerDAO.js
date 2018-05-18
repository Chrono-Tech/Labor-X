import { JobModel, JobIPFSModel, JobPostedEvent, SKILLS_LIST, TAG_AREAS_LIST, TAG_CATEGORIES_LIST, JOB_STATES_LIST } from 'src/models'
import { filterArrayByIndexMask } from 'src/utils'
import Web3 from 'web3'
import AbstractContractDAO from './AbstractContractDAO'

export default class JobControllerDAO extends AbstractContractDAO {
  constructor (address, abi) {
    super(address, abi)
  }

  async connect (Web3, options) {
    if (this.isConnected) {
      this.disconnect()
    }
    // eslint-disable-next-line no-console
    console.log('[JobControllerDAO] Connect')
    this.contract = new Web3.eth.Contract(this.abi.abi, this.address, options)

    this.jobPostedEmitter = this.contract.events.JobPosted({})
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
    }
  }

  get isConnected () {
    return this.contract != null // nil check
  }

  async getJobs (/*address, fromId = 1, limit = 10*/) {
    const length = await this.contract.methods.getJobsCount().call()
    const array = Array.from({ length })
    return Promise.all(
      array.map(async (element, index) => {
        const id = index + 1
        const [
          client,
          worker,
          skillsArea,
          skillsCategory,
          skills,
          ipfsHash,
          state,
        ] = await Promise.all([
          await this.contract.methods.getJobClient(id).call(),
          await this.contract.methods.getJobWorker(id).call(),
          await this.contract.methods.getJobSkillsArea(id).call(),
          await this.contract.methods.getJobSkillsCategory(id).call(),
          await this.contract.methods.getJobSkills(id).call(),
          await this.contract.methods.getJobDetailsIPFSHash(id).call(),
          await this.contract.methods.getJobState(id).call(),
        ])
        return new JobModel({
          id,
          // status,
          client,
          worker,
          state: JOB_STATES_LIST[state],
          ipfs: new JobIPFSModel({
            // ...await ipfsService.get(ipfsHash[i]),
            hash: ipfsHash,
          }),
          area: TAG_AREAS_LIST[skillsArea],
          category: TAG_CATEGORIES_LIST[skillsCategory],
          skills: filterArrayByIndexMask(SKILLS_LIST, skills),
        })
      })
    )
  }

  createPostJobTx (sender: String, area: Number, category: Number, skills: Number, detailsIPFSHash: String) {
    const data = this.contract.methods.postJob(area, category, skills, Web3.utils.asciiToHex(detailsIPFSHash)).encodeABI()
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
        job: new JobPostedEvent({
          key: `${data.transactionHash}/${data.logIndex}`,
          self: returnValues.self,
          jobId: returnValues.jobId,
          client: returnValues.client,
          skillsTagsMask: returnValues.skills, // bit-mask,
          skillsTagsAreaMask: returnValues.skillsArea, // bit-mask,
          skillsTagsCategoryMask: returnValues.skillsCategory, // bit-mask,
          ipfsHash: returnValues.detailsIPFSHash,
          status: returnValues.status,
        }),
      })
    })
  }

  handleError (error) {
    // eslint-disable-next-line no-console
    console.error('[JobControllerDAO] Error in subscription', error)
  }
}
