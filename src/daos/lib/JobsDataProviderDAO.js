import {
  JobModel,
  JobIPFSModel,
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
  bytes32ToIPFSHash,
  bytes32ToNumber,
  bytes32ToAddress,
  bytes32ToDate,
  bytes32ToBigNumber,
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
        pausedFor: bytes32ToDate(pausedForBytes, true),
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
      boardId,
      paused,
      defaultPay,
      pausedAt,
      pausedFor,
    }) => {
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

}
