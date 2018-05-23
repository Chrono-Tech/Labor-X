import {
  JobModel,
  JobIPFSModel,
  JobPostedEvent,
  JobStateModel,
  JobExtraModel,
  TagAreaModel,
  TagCategoryModel,
  SkillModel,
  JOB_STATE_ANY_MASK,
  SKILL_ANY_MASK,
  TAG_AREA_ANY_MASK,
  TAG_CATEGORY_ANY_MASK,
} from 'src/models'
import {
  loadFromIPFS,
  ipfsHashToBytes32,
  bytes32ToIPFSHash,
  bytes32ToNumber,
  bytes32ToAddress,
  bytes32ToDate,
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

  async getJobs (boardControllerDAO, /* client, worker, fromId = 1, limit = 10 */) {
    const length = await this.contract.methods.getJobsCount().call()
    const array = Array.from({ length })
    const jobs = await this.getJobsByIds(
      boardControllerDAO,
      array.map((element, index) => index + 1)
    )
    return jobs
  }

  async getJobsByIds (boardControllerDAO, ids: Number[]) {
    const data = await this.contract.methods.getJobsByIds(ids).call()
    const parsed = []
    for (let i = 0; i < data.length; i += 9) {
      const [
        idBytes,
        clientBytes,
        workerBytes,
        skillsAreaBytes,
        skillsCategoryBytes,
        skillsBytes,
        ipfsHashBytes,
        stateBytes,
        finalizedAtBytes,
      ] = data.slice(i, i + 9)
      parsed.push({
        id: bytes32ToNumber(idBytes),
        client: bytes32ToAddress(clientBytes, true),
        worker: bytes32ToAddress(workerBytes, true),
        skillsArea: bytes32ToNumber(skillsAreaBytes),
        skillsCategory: bytes32ToNumber(skillsCategoryBytes),
        skills: bytes32ToNumber(skillsBytes),
        ipfsHash: bytes32ToIPFSHash(ipfsHashBytes),
        state: bytes32ToNumber(stateBytes),
        finalizedAt: bytes32ToDate(finalizedAtBytes, true),
      })
    }
    const promises = parsed.map(async ({
      id,
      client,
      worker,
      skillsArea,
      skillsCategory,
      skills,
      ipfsHash,
      state,
      finalizedAt,
    }) => {
      const boardId = await boardControllerDAO.getJobsBoard(id)
      return new JobModel({
        id,
        client,
        worker,
        boardId,
        state: JobStateModel.valueOf(state),
        area: TagAreaModel.valueOf(skillsArea),
        category: TagCategoryModel.valueOf(skillsCategory),
        skills: SkillModel.arrayValueOfMask(skills),
        ipfs: new JobIPFSModel({
          ...(await loadFromIPFS(ipfsHash) || {}),
          hash: ipfsHash,
        }),
        extra: new JobExtraModel({
          // TODO Fetch counts
          finalizedAt,
        }),
      })
    })
    return Promise.all(promises)
  }

  async getJobsIds (
    stateMask: Number = JOB_STATE_ANY_MASK,
    skillsArea: Number = TAG_AREA_ANY_MASK,
    skillsCategory: Number = TAG_CATEGORY_ANY_MASK,
    skills: Number = SKILL_ANY_MASK,
    pausedMask: Number = 1 | 2,
    fromId: Number = 1,
    limit: Number = 100
  ): Promise<Number[]> {
    // console.log({
    //   stateMask,
    //   skillsArea,
    //   skillsCategory,
    //   skills,
    //   pausedMask,
    //   fromId,
    //   limit,
    // })
    return this.contract.methods.getJobs(
      stateMask,
      skillsArea,
      skillsCategory,
      skills,
      pausedMask,
      fromId,
      limit
    ).call()
  }

  async getJobById (boardControllerDAO, id) {
    const [ job ] = await this.getJobsByIds(boardControllerDAO, [ id ])
    return job
  }

  createPostJobTx (sender: String, area: Number, category: Number, skills: Number, detailsIPFSHash: String) {
    const data = this.contract.methods.postJob(area, category, skills, ipfsHashToBytes32(detailsIPFSHash)).encodeABI()
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
