import {
  JobModel,
  JobIPFSModel,
  JobStateModel,
  JobExtraModel,
  JobOfferModel,
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
  bytes32ToIPFSHash,
  bytes32ToNumber,
  bytes32ToBigNumber,
  bytes32ToAddress,
  bytes32ToDate,
} from 'src/utils'
import AbstractContractDAO from './AbstractContractDAO'

const DEFAULT_ANY_FILTER_PARAM = 0

export default class JobsDataProviderDAO extends AbstractContractDAO {
  constructor ({ address, history, abi }) {
    super({ address, history, abi })
  }

  async connect (web3, options) {
    if (this.isConnected) {
      this.disconnect()
    }
    // eslint-disable-next-line no-console
    console.log(`[${this.constructor.name}] Connect`)
    this.contract = new web3.eth.Contract(this.abi.abi, this.address, options)
    this.history = this.history != null // nil check
      ? new web3.eth.Contract(this.abi.abi, this.history, options)
      : this.contract

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

  async getJobsForWorker (
    workerAddress: String,
    stateMask: Number = DEFAULT_ANY_FILTER_PARAM,
    skillsArea: Number = DEFAULT_ANY_FILTER_PARAM,
    skillsCategory: Number = DEFAULT_ANY_FILTER_PARAM,
    skills: Number = DEFAULT_ANY_FILTER_PARAM,
    pausedMask: Number = DEFAULT_ANY_FILTER_PARAM,
    fromId: Number = DEFAULT_ANY_FILTER_PARAM,
    limit: Number = 99999)
  {
    const jobs = await this.contract.methods.getJobForWorker(
      workerAddress,
      stateMask,
      skillsArea,
      skillsCategory,
      skills,
      pausedMask,
      fromId,
      limit
    ).call()
    return jobs
  }

  async getJobsForClient (
    clientAddress: String,
    stateMask: Number = DEFAULT_ANY_FILTER_PARAM,
    skillsArea: Number = DEFAULT_ANY_FILTER_PARAM,
    skillsCategory: Number = DEFAULT_ANY_FILTER_PARAM,
    skills: Number = DEFAULT_ANY_FILTER_PARAM,
    pausedMask: Number = DEFAULT_ANY_FILTER_PARAM,
    fromId: Number = DEFAULT_ANY_FILTER_PARAM,
    limit: Number = 99999)
  {
    const jobs = await this.contract.methods.getJobsForClient(
      clientAddress,
      stateMask,
      skillsArea,
      skillsCategory,
      skills,
      pausedMask,
      fromId,
      limit
    ).call()

    return jobs
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
    const JOBS_RESULT_OFFSET = 21
    const data = await this.contract.methods.getJobsByIds(ids).call()
    const parsed = []
    for (let i = 0; i < data.length; i += JOBS_RESULT_OFFSET) {
      const [
        idBytes,
        boardIdBytes,
        clientBytes,
        workerBytes,
        skillsAreaBytes,
        skillsCategoryBytes,
        skillsBytes,
        ipfsHashBytes,
        stateBytes,
        flowTypeBytes,
        pausedBytes,
        defaultPayBytes,
        createdAtBytes,
        acceptedAtBytes,
        pendingStartAtBytes,
        startTimeBytes,
        pausedAtBytes,
        pausedForBytes,
        pendingFinishAtBytes,
        finishTimeBytes,
        finalizedAtBytes,
      ] = data.slice(i, i + JOBS_RESULT_OFFSET)
      parsed.push({
        id: bytes32ToNumber(idBytes),
        boardId: bytes32ToNumber(boardIdBytes),
        client: bytes32ToAddress(clientBytes, true),
        worker: bytes32ToAddress(workerBytes, true),
        skillsArea: bytes32ToNumber(skillsAreaBytes),
        skillsCategory: bytes32ToNumber(skillsCategoryBytes),
        skills: bytes32ToNumber(skillsBytes),
        ipfsHash: bytes32ToIPFSHash(ipfsHashBytes),
        state: bytes32ToNumber(stateBytes),
        flowType: bytes32ToBigNumber(flowTypeBytes),
        paused: !!bytes32ToNumber(pausedBytes),
        defaultPay: bytes32ToNumber(defaultPayBytes),
        createdAt: bytes32ToDate(createdAtBytes, true),
        acceptedAt: bytes32ToDate(acceptedAtBytes, true),
        pendingStartAt: bytes32ToDate(pendingStartAtBytes, true),
        startTime: bytes32ToDate(startTimeBytes, true),
        pausedAt: bytes32ToDate(pausedAtBytes, true),
        pausedFor: bytes32ToNumber(pausedForBytes, true),
        pendingFinishAt: bytes32ToDate(pendingFinishAtBytes, true),
        finishTime: bytes32ToDate(finishTimeBytes, true),
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
      createdAt,
      acceptedAt,
      pendingStartAt,
      startTime,
      pendingFinishAt,
      finishTime,
      finalizedAt,
      // boardId,
      paused,
      defaultPay,
      pausedAt,
      pausedFor,
      flowType,
    }) => {
      const ipfsValue = await loadFromIPFS(ipfsHash)
      const ipfs = new JobIPFSModel({
        ...(ipfsValue || {}),
        hash: ipfsHash,
      })
      return new JobModel({
        id,
        client,
        worker,
        boardId: ipfs.boardId || 0,
        state: JobStateModel.valueOf(state),
        area: TagAreaModel.valueOfCode(skillsArea),
        category: TagCategoryModel.valueOfCode(skillsCategory),
        skills: SkillModel.arrayValueOfMask(skills),
        ipfs,
        flowType,
        paused,
        defaultPay,
        pausedAt,
        pausedFor,
        extra: new JobExtraModel({
          // TODO Fetch counts
          createdAt,
          acceptedAt,
          pendingStartAt,
          startTime,
          pendingFinishAt,
          finishTime,
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

  async getJobOffers (
    jobId: Number,
    fromId: Number = 0,
    limit: Number = 1000
  ) {
    const data = await this.contract.methods.getJobOffers(
      jobId,
      fromId,
      limit
    ).call()

    const {
      _id,
      _workers,
      _rates,
      _estimates,
      _onTops,
    } = data

    if(!_id) { return [] }

    const parsed = []
    // eslint-disable-next-line no-underscore-dangle
    for (let i = 0; i < data._workers.length; i++) {
      parsed.push({
        jobId,
        worker: bytes32ToAddress(_workers[0], true),
        rate: bytes32ToBigNumber(_rates[0]),
        estimate: bytes32ToBigNumber(_estimates[0]),
        onTop: bytes32ToBigNumber(_onTops[0]),
      })
    }

    return parsed.map(offer => new JobOfferModel(offer))
  }
}
