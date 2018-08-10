// import BigNumber from 'bignumber.js'
import get from 'lodash/get'
import {
  BoardModel,
  BoardIPFSModel,
  BoardExtraModel,
  BoardCreatedEvent,
  BoardClosedEvent,
  UserBindedEvent,
  TagModel,
  TagAreaModel,
  TagCategoryModel,
  BoardPostFeeModel,
  BoardRequirementModel,
} from 'src/models'
import { loadFromIPFS, bytes32ToIPFSHash, ipfsHashToBytes32  } from 'src/utils'
import AbstractContractDAO from './AbstractContractDAO'
import {TAGS_LIST} from "../../models";
import { TAG_ANY_MASK } from "src/models/meta/TagModel";
import { TAG_AREA_ANY_MASK } from "src/models/meta/TagAreaModel";
import { TAG_CATEGORY_ANY_MASK } from "src/models/meta/TagCategoryModel";

export default class BoardControllerDAO extends AbstractContractDAO {
  constructor ({ address, history, abi }) {
    super({ address, history, abi })
  }

  async connect (web3, options) {
    if (this.isConnected) {
      this.disconnect()
    }
    // eslint-disable-next-line no-console
    console.log('[BoardControllerDAO] Connect')
    this.contract = new web3.eth.Contract(this.abi.abi, this.address, options)
    this.history = this.history != null // nil check
      ? new web3.eth.Contract(this.abi.abi, this.history, options)
      : this.contract
    this.boardCreatedEmitter = this.history.events.BoardCreated({})
      .on('data', this.handleBoardCreatedData.bind(this))
      .on('error', this.handleError.bind(this))
    this.boardClosedEmitter = this.history.events.BoardClosed({})
      .on('data', this.handleBoardClosedData.bind(this))
      .on('error', this.handleError.bind(this))
    this.userBindedEmitter = this.history.events.UserBinded({})
      .on('data', this.handleUserBindedData.bind(this))
      .on('error', this.handleError.bind(this))

    return this.token
  }

  disconnect () {
    if (this.isConnected) {
      this.boardCreatedEmitter.removeAllListeners()
      this.boardClosedEmitter.removeAllListeners()
      this.userBindedEmitter.removeAllListeners()
      this.boardCreatedEmitter = null
      this.boardClosedEmitter = null
      this.userBindedEmitter = null
      this.contract = null
      this.history = null
    }
  }

  get isConnected () {
    return this.contract != null // nil check
  }

  async getUserStatus (address, boardId): Promise<Boolean> {
    const res = await this.contract.methods.getUserStatus(boardId, address).call()
    return Boolean(res)
  }

  async getJobsBoard (jobId) {
    return Number(await this.contract.methods.getJobsBoard(jobId).call())
  }

  async getBoardById (signer, id) {
    const [ board ] = await this.getBoardsByIds(signer, [ id ])
    return board
  }

  async getBoards (signer) {
    const length = await this.contract.methods.getBoardsCount().call()
    const array = Array.from({ length })
    const boards = await this.getBoardsByIds(
      signer,
      array.map((element, index) => index + 1)
    )
    return boards
  }

  async getBoardsForUser (address, tags = TAG_ANY_MASK, tagsArea = TAG_AREA_ANY_MASK, tagsCategory = TAG_CATEGORY_ANY_MASK) {
    const ids = await this.contract.methods.getBoardsForUser(address, tags, tagsArea, tagsCategory).call()
    const boards = await this.getBoards(address)
    let b=8;
  }

  async getBoardsByIds (signer, ids: Number[]) {
    const boards = []
    const response = await this.contract.methods.getBoardsByIds(ids).call()
    const {
      _gotIds,
      _creators,
      _ipfs,
      _tags,
      _tagsAreas,
      _tagsCategories,
      _status,
    } = response
    const ipfsList = await Promise.all(ids.map((id, i) => loadFromIPFS(bytes32ToIPFSHash(_ipfs[i])) || {}))
    for (let i = 0; i < ids.length; i++) {
      const ipfsHash = bytes32ToIPFSHash(_ipfs[i])
      const id = Number(_gotIds[i])
      const isSignerJoined = await this.getUserStatus(signer, id)
      // const ipfs = await loadFromIPFS(ipfsHash) || {}
      const ipfs = ipfsList[i]

      boards.push(new BoardModel({
        id,
        creator: _creators[i],
        isActive: _status[i],
        // tags: TagModel.arrayValueOfMask(parseInt(_tags[i])),
        tags: [TAGS_LIST[3]],
        tagsArea: TagAreaModel.valueOfCode(_tagsAreas[i]),
        tagsCategory: TagCategoryModel.arrayValueOfMask(_tagsCategories[i]),
        ipfs: new BoardIPFSModel({
          ...ipfs,
          joinRequirement: get(ipfs, "joinRequirement") !== undefined ? BoardRequirementModel.valueOf(get(ipfs, "joinRequirement")) : null,
          fee: get(ipfs, "fee") !== undefined ? BoardPostFeeModel.valueOf(get(ipfs, "fee")) : null,
          lhus: get(ipfs, "lhus") !== undefined ? +get(ipfs, "lhus") : 0,
          hash: ipfsHash,
          endorsingSkills: !!get(ipfs, "endorsingSkills"),
        }),
        extra: new BoardExtraModel({
          isSignerJoined,
        }),
      }))
    }

    return boards
  }

  createCreateBoardTx (sender, tags, tagsAreas, tagsCategories, ipfs) {
    let  data = this.contract.methods.createBoard(tags, tagsAreas, tagsCategories, ipfsHashToBytes32(ipfs)).encodeABI()
    return {
      from: sender,
      to: this.address,
      data,
    }
  }

  createJoinBoardTx (sender, boardId) {
    const data = this.contract.methods.bindUserWithBoard(boardId, sender).encodeABI()
    return {
      from: sender,
      to: this.address,
      data,
    }
  }

  createTerminateBoardTx (sender, boardId) {
    const data = this.contract.methods.closeBoard(boardId).encodeABI()
    return {
      from: sender,
      to: this.address,
      data,
    }
  }

  handleBoardCreatedData (data) {
    // eslint-disable-next-line no-console
    console.log('[BoardControllerDAO] BoardCreated', data)
    const { returnValues } = data
    setImmediate(() => {
      this.emit('BoardCreated', {
        data,
        event: new BoardCreatedEvent({
          key: `${data.transactionHash}/${data.logIndex}`,
          self: returnValues.self,
          boardId: Number(returnValues.boardId),
          name: returnValues.name,
          description: returnValues.boardDescription,
          creator: returnValues.creator,
          tags: Number(returnValues.boardTags),
          tagsArea: Number(returnValues.boardTagsArea),
          tagsCategory: Number(returnValues.boardTagsCategory),
          boardIpfsHash: returnValues.boardIpfsHash,
          status: returnValues.status,
        }),
      })
    })
  }

  handleUserBindedData (data) {
    // eslint-disable-next-line no-console
    console.log('[BoardControllerDAO] UserBinded', data)
    const { returnValues } = data
    setImmediate(() => {
      this.emit('UserBinded', {
        data,
        event: new UserBindedEvent({
          key: `${data.transactionHash}/${data.logIndex}`,
          self: returnValues.self,
          boardId: Number(returnValues.boardId),
          user: returnValues.user,
          status: returnValues.status,
        }),
      })
    })
  }

  handleBoardClosedData (data) {
    // eslint-disable-next-line no-console
    console.log('[BoardControllerDAO] BoardClosed', data)
    const { returnValues } = data
    setImmediate(() => {
      this.emit('BoardClosed', {
        data,
        event: new BoardClosedEvent({
          key: `${data.transactionHash}/${data.logIndex}`,
          self: returnValues.self,
          boardId: Number(returnValues.boardId),
          status: returnValues.status,
        }),
      })
    })
  }

  handleError (error) {
    // eslint-disable-next-line no-console
    console.error('[BoardControllerDAO] Error in subscription', error)
  }
}
